'use client';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

// Set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in .env.local with your real Paystack key.
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Paystack inline popup type - matches the global `PaystackPop` object
 * injected by https://js.paystack.co/v1/inline.js
 */
declare global {
  interface Window {
    PaystackPop?: {
      setup(config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        onClose: () => void;
        callback: (response: { reference: string }) => void;
      }): { openIframe(): void };
    };
  }
}

const generateReference = () =>
  `donation-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

/**
 * Impact-anchored giving tiers (landing-page best practice: concrete specificity
 * beats open amounts). Wording is deliberately conservative - "helps provide" -
 * so it stays accurate even as program costs change.
 */
export interface GiveTier {
  amount: string;
  label: string;
  impact: string;
}

export const GIVE_TIERS: GiveTier[] = [
  { amount: '100', label: 'GHS 100', impact: 'Helps provide school supplies for a pupil' },
  { amount: '250', label: 'GHS 250', impact: 'Helps provide a welfare pack for a vulnerable family' },
  { amount: '500', label: 'GHS 500', impact: 'Supports free health screenings for community members' },
  { amount: '1000', label: 'GHS 1,000', impact: 'Helps sponsor a community outreach event' },
];

/** Lazily load the Paystack inline script once. Returns a promise that resolves when ready. */
function loadPaystackScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));
  if (window.PaystackPop) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
    if (existing) {
      // Script tag is already in DOM but may still be loading
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Paystack script failed to load')));
      // Script may have already loaded between the check above and this listener:
      if (window.PaystackPop) resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Paystack script failed to load'));
    document.head.appendChild(script);
  });
}

export interface PaystackDonateButtonHandle {
  openWithAmount: (amount: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PaystackDonateButtonProps {}

export const PaystackDonateButton = React.forwardRef<PaystackDonateButtonHandle, PaystackDonateButtonProps>(
  function PaystackDonateButton(_props, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; amount?: string }>({});
  const [formError, setFormError] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<string>(generateReference());

  const paystackConfigured =
  PAYSTACK_PUBLIC_KEY.startsWith('pk_test_') || PAYSTACK_PUBLIC_KEY.startsWith('pk_live_');

  const openModal = () => {
    referenceRef.current = generateReference();
    setFieldErrors({});
    setFormError('');
    setStatusMsg('');
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFieldErrors({});
    setFormError('');
    setStatusMsg('');
    setProcessing(false);
    triggerRef.current?.focus();
  };

  const viewManualDetails = () => {
    closeModal();
    document.getElementById('manual-donation')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
    (focusableElements[0] ?? dialog).focus();

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    dialog.addEventListener('keydown', handleTab);
    return () => dialog.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Escape to close
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  };

  // Lock body scroll while the donation modal is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePaymentSuccess = useCallback(async (ref: string) => {
    setProcessing(true);
    setFieldErrors({});
    setFormError('');
    setStatusMsg('');
    try {
      const res = await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: ref }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.verified) {
        setStatusMsg(`Donation confirmed! Reference: ${ref}, thank you.`);
      } else {
        setStatusMsg(`Donation received (reference ${ref}), confirmation pending, thank you!`);
      }
    } catch {
      setStatusMsg(`Donation received (reference ${ref}), confirmation pending, thank you!`);
    } finally {
      setProcessing(false);
    }
    referenceRef.current = generateReference();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (processing) return;

    // Per-field validation - errors are announced and tied to their input
    // via aria-describedby, directly beneath the field.
    const errors: { email?: string; amount?: string } = {};
    if (!amount || parseFloat(amount) <= 0) {
      errors.amount = 'Please enter a valid amount.';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (errors.amount || errors.email) {
      setFieldErrors(errors);
      return;
    }

    setProcessing(true);
    setFieldErrors({});
    setFormError('');
    setStatusMsg('');

    try {
      await loadPaystackScript();
      if (!window.PaystackPop) throw new Error('Paystack not available');

      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: Math.round(parseFloat(amount) * 100), // pesewas
        currency: 'GHS',
        ref: referenceRef.current,
        onClose: () => {
          setProcessing(false);
          setStatusMsg('Payment window closed, no charge was made.');
        },
        callback: (response) => {
          handlePaymentSuccess(response.reference);
        },
      });
      handler.openIframe();
    } catch {
      setProcessing(false);
      setFormError('Unable to start the payment window. Please try again.');
    }
  };

  const openWithAmount = useCallback((presetAmount: string) => {
    referenceRef.current = generateReference();
    setFieldErrors({});
    setFormError('');
    setStatusMsg('');
    setAmount(presetAmount);
    setIsOpen(true);
  }, []);

  useImperativeHandle(ref, () => ({ openWithAmount }), [openWithAmount]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={openModal}
        className="inline-flex items-center justify-center font-body font-semibold text-base bg-brand-gold text-brand-navy px-8 py-4 rounded-btn border-2 border-brand-gold hover:bg-brand-gold-light hover:border-brand-gold-light transition-all duration-300 shadow-lg shadow-brand-gold/20 w-full sm:w-auto"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
        Donate Online
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          onKeyDown={handleKeyDown}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-modal-title"
          tabIndex={-1}
        >
          <div className="bg-white rounded-[1.25rem] w-full max-w-md p-8 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-brand-cream text-brand-navy hover:bg-brand-gold transition-colors"
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="text-center mb-8">
              <span className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-gold">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </span>
              <h3 id="donation-modal-title" className="font-display text-2xl font-bold text-brand-navy">Make a Donation</h3>
              <p className="font-body text-sm text-brand-navy/70 mt-2">
                {paystackConfigured
                  ? 'Enter your details to proceed with Paystack secure payment.'
                  : 'Online card payment is almost here - and you can still give right now.'}
              </p>
            </div>

            {statusMsg && (
              <p role="status" className="font-body text-sm text-brand-navy/70 bg-brand-cream rounded-btn px-4 py-3 mb-5 text-center">
                {statusMsg}
              </p>
            )}
            {formError && (
              <p role="alert" className="font-body text-sm text-brand-red-dark bg-brand-red/5 rounded-btn px-4 py-3 mb-5 text-center">
                {formError}
              </p>
            )}

            {paystackConfigured ? (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="donor-email" className="block font-body text-sm font-semibold text-brand-navy mb-1.5">Email Address</label>
                    <input
                      id="donor-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      aria-invalid={fieldErrors.email ? true : undefined}
                      aria-describedby={fieldErrors.email ? 'donor-email-error' : undefined}
                      onChange={(e) => { setEmail(e.target.value); setFieldErrors((f) => ({ ...f, email: undefined })); }}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-btn border-2 bg-white font-body text-base text-brand-navy placeholder:text-brand-navy/55 focus:outline-none focus:border-brand-gold transition-colors ${fieldErrors.email ? 'border-brand-red' : 'border-brand-navy/20'}`}
                    />
                    {fieldErrors.email && (
                      <p id="donor-email-error" role="alert" className="font-body text-xs font-semibold text-brand-red-dark mt-1.5">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Impact-anchored giving tiers */}
                  <fieldset>
                    <legend className="block font-body text-sm font-semibold text-brand-navy mb-2">Choose an amount (GHS)</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {GIVE_TIERS.map((tier) => {
                        const selected = amount === tier.amount;
                        return (
                          <button
                            key={tier.amount}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => { setAmount(tier.amount); setFieldErrors((f) => ({ ...f, amount: undefined })); }}
                            className={`rounded-btn border-2 px-3 py-2.5 text-center lg:text-left transition-colors duration-150 ${
                              selected
                                ? 'border-brand-gold bg-brand-gold/10'
                                : 'border-brand-navy/15 hover:border-brand-navy/40'
                            }`}
                          >
                            <span className="block font-body font-bold text-base text-brand-navy">{tier.label}</span>
                            <span className="block font-body text-xs text-brand-navy/70 leading-snug mt-0.5">{tier.impact}</span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="donor-amount" className="block font-body text-sm font-semibold text-brand-navy mb-1.5">Custom amount (GHS)</label>
                    <input
                      id="donor-amount"
                      type="number"
                      min="1"
                      step="0.01"
                      required
                      inputMode="decimal"
                      autoComplete="off"
                      value={amount}
                      aria-invalid={fieldErrors.amount ? true : undefined}
                      aria-describedby={fieldErrors.amount ? 'donor-amount-error' : undefined}
                      onChange={(e) => { setAmount(e.target.value); setFieldErrors((f) => ({ ...f, amount: undefined })); }}
                      placeholder="Other amount"
                      className={`w-full px-4 py-3 rounded-btn border-2 bg-white font-body text-base text-brand-navy placeholder:text-brand-navy/55 focus:outline-none focus:border-brand-gold transition-colors ${fieldErrors.amount ? 'border-brand-red' : 'border-brand-navy/20'}`}
                    />
                    {fieldErrors.amount && (
                      <p id="donor-amount-error" role="alert" className="font-body text-xs font-semibold text-brand-red-dark mt-1.5">
                        {fieldErrors.amount}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full font-body font-bold text-lg bg-brand-red text-white py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Processing…' : 'Proceed to Pay'}
                  </button>
                </form>

                <p className="font-body text-xs text-center text-brand-navy/70 mt-6 leading-relaxed">
                  Secured by <strong className="font-semibold">Paystack</strong> (card &amp; mobile money). Prince Asamany Foundation is an NGO based in Ejisu, Ashanti Region, Ghana.
                </p>
              </>
            ) : (
              <div className="text-center">
                <p className="font-body text-base text-brand-navy/80 leading-relaxed">
                  Online card payment is coming soon. You can give right now via{' '}
                  <strong className="font-semibold">bank transfer</strong> or{' '}
                  <strong className="font-semibold">MTN MoMo</strong>. Tap below for the account details.
                </p>
                <button
                  type="button"
                  onClick={viewManualDetails}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 font-body font-bold text-base bg-brand-gold text-brand-navy py-3.5 rounded-btn border-2 border-brand-gold transition-colors duration-200 hover:bg-brand-gold-light hover:border-brand-gold-light"
                >
                  View Bank &amp; MoMo Details
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
  }
);
