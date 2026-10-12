import React from 'react';

export interface Program {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export const programs: Program[] = [
  {
    title: 'Preventive Healthcare & Screenings',
    description:
      'Partnering with local institutions to organize free health screenings, focusing on early detection of critical illnesses such as cervical cancer.',
    href: '/programs#health-screenings',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Social Welfare & Relief',
    description:
      'Providing immediate, tangible support to the most vulnerable through initiatives like the annual "Joy to the Street" campaign.',
    href: '/programs#social-welfare',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Economic Empowerment',
    description:
      'Running vocational skills training and workshops that equip community members with tools for economic independence.',
    href: '/programs#economic-empowerment',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" />
      </svg>
    ),
  },
];

export interface Story {
  id: string;
  name: string;
  location: string;
  role: string;
  tag: string;
  tagColor: string;
  image: string;
  imageAlt: string;
  quote: string;
  body: string[];
  /** Display date shown on cards/detail (e.g. 'July 2026'). Optional. */
  date?: string;
  /** Optional photo gallery rendered on the story detail page. */
  gallery?: { src: string; alt: string }[];
}

export const stories: Story[] = [
  {
    id: 'free-deworming-exercise',
    name: 'Free Deworming Exercise',
    location: 'Forestry Commission Training Centre & Ejisu Akyawkrom',
    role: 'Student Health Initiative',
    tag: 'Healthcare',
    tagColor: 'bg-brand-red text-white',
    image: '/media/opt/IMG-20260727-WA0008.webp',
    imageAlt: 'Students of the Certificate in Natural Resources Management programme hold up deworming tablets in a group photo on the steps of the Forestry Commission Training Centre',
    quote: 'The exercise was aimed at promoting good health and preventing intestinal worm infections among the students.',
    date: 'July 2026',
    body: [
      'In July, the Prince Asamany Foundation organized a free deworming exercise for 84 students offering the Certificate in Natural Resources Management course at the Forestry Commission Training Centre and in the Ejisu Akyawkrom community.',
      'The exercise was aimed at promoting good health and preventing intestinal worm infections among the students. Students received free deworming medication and were educated on the importance of personal hygiene, proper sanitation, and healthy living practices.',
      'The exercise was important because good health enables students to concentrate on their studies, participate actively in practical training, and complete their programme successfully. It also reduced the financial burden on the students while promoting awareness of preventive healthcare.',
      'Overall, the exercise was a valuable community health outreach that contributed to the well-being of the 84 students and demonstrated the Prince Asamany Foundation\u2019s commitment to supporting students and promoting healthy communities.',
    ],
    gallery: [
      { src: '/media/opt/WhatsApp Image 2026-08-26 at 00.41.26.webp', alt: 'Flyer for the Free Deworming Exercise organized by the Prince Asamany Foundation' },
      { src: '/media/opt/IMG-20260727-WA0011.webp', alt: 'A wider group photo of students on the training-centre steps, several holding up deworming tablets' },
      { src: '/media/opt/IMG-20260727-WA0017.webp', alt: 'Students in Forestry Commission shirts gather inside the training centre during the deworming exercise' },
      { src: '/media/opt/IMG-20260727-WA0014.webp', alt: 'A screened health station set up for the deworming exercise' },
      { src: '/media/opt/IMG-20260727-WA0018.webp', alt: 'A student holds her deworming medication as a staff member looks on' },
      { src: '/media/opt/IMG-20260727-WA0010.webp', alt: 'Students and foundation representatives walking together outdoors' },
      { src: '/media/opt/IMG-20260727-WA0012.webp', alt: 'Foundation representatives and students walking together' },
      { src: '/media/opt/IMG-20260727-WA0016.webp', alt: 'Foundation representative addressing students indoors' },
    ],
  },
  {
    id: 'farmers-engagement-akyawkrom',
    name: "Farmers' Engagement",
    location: 'Akyawkrom & Surrounding Communities',
    role: 'Economic Empowerment Initiative',
    tag: 'Economic Empowerment',
    tagColor: 'bg-brand-green text-white',
    image: '/media/opt/IMG-20260713-WA0030.webp',
    imageAlt: 'A community member in a colourful headwrap holds a young child outdoors in warm sunlight at the Farmers\u2019 Engagement in Akyawkrom',
    quote: 'The initiative is expected to contribute to poverty reduction, improved food production, and sustainable livelihoods among farmers in the community.',
    date: 'July 2026',
    body: [
      'The Prince Asamany Foundation engaged farmers in Akyawkrom and its surrounding communities to discuss sustainable farming practices and ways of improving their livelihoods.',
      'The engagement focused on promoting environmentally friendly farming methods, improving productivity, and encouraging farmers to work together. Discussions also centered on the formation of a farmers’ cooperative, which will help members access resources, share knowledge, improve market opportunities, and strengthen their bargaining power.',
      'The initiative is expected to contribute to poverty reduction, improved food production, and sustainable livelihoods among farmers in the community. The Foundation remains committed to supporting farmers and creating opportunities that will promote economic empowerment and community development.',
    ],
    gallery: [
      { src: '/media/opt/WhatsApp Image 2026-08-26 at 00.41.30.webp', alt: 'Official event flyer for the Farmers in Akyawkrom and its environs' },
      { src: '/media/opt/IMG-20260713-WA0004.webp', alt: 'A Foundation representative registers a resident during the engagement at Akyawkrom' },
      { src: '/media/opt/IMG-20260713-WA0041.webp', alt: 'Farmers and residents gather under a covered structure during the engagement' },
      { src: '/media/opt/IMG-20260713-WA0020.webp', alt: 'Older community members in colourful traditional dress seated at the gathering' },
      { src: '/media/opt/IMG-20260713-WA0039.webp', alt: 'A speaker addresses seated community members during the engagement' },
      { src: '/media/opt/IMG-20260713-WA0002.webp', alt: 'Attendees gathering and conversing outside before the engagement' },
      { src: '/media/opt/IMG-20260713-WA0012.webp', alt: 'Foundation representative discussing with an attendee' },
      { src: '/media/opt/IMG-20260713-WA0017.webp', alt: 'A large group of community members attentively listening' },
      { src: '/media/opt/IMG-20260713-WA0025.webp', alt: 'Foundation representative facilitating a discussion with the farmers' },
      { src: '/media/opt/IMG-20260713-WA0042.webp', alt: 'Women in colourful traditional dresses seated together at the gathering' },
    ],
  },

  {
    id: 'joy-to-the-street',
    name: 'Joy to the Street Campaign',
    location: 'Ejisu Municipality',
    role: 'Annual Welfare Initiative',
    tag: 'Social Welfare',
    tagColor: 'bg-brand-navy text-white',
    image: '/media/opt/IMG_6871.webp',
    imageAlt: 'Prince Asamany sharing a moment with a community member during the Joy to the Street campaign',
    quote: 'Rather than offering isolated charity, this project is structured as a movement designed to foster community solidarity and provide children with essential educational tools.',
    body: [
      'The foundation\'s hallmark welfare campaign is the annual "Joy to the Street" program. This flagship community outreach focuses warmly on the homeless, low-income families, and vulnerable children across the Ejisu Municipality.',
      'On Boxing Day, December 26th, 2024, the Prince Asamany Foundation organized holiday relief for vulnerable community members in Kumasi (Amakom, WAEC Street, Asafo, and Jubilee Park).',
      'The campaign distributed food staples, clothing, toiletries, and other essential items to people in need.',
      'Rather than offering isolated charity, the project is structured as a movement designed to foster social solidarity and provide children with the basic educational tools needed to stay in school.'
    ],
  },
  {
    id: 'cervical-cancer-screening',
    name: 'Preventive Healthcare',
    location: 'Mansa Memorial Hospital',
    role: 'Medical Outreach Partnership',
    tag: 'Healthcare',
    tagColor: 'bg-brand-red text-white',
    image: '/media/opt/IMG_8203.webp',
    imageAlt: 'Foundation team and health workers posing with a banner at a free cervical cancer screening event',
    quote: 'Through community engagement and health education, the initiative empowered women with life-saving knowledge and promoted preventive healthcare.',
    body: [
      'The Prince Asamany Foundation is committed to improving the health and well-being of underserved communities through impactful outreach and trusted partnerships.',
      'One of its notable initiatives focused on cervical cancer awareness and prevention, where the Foundation collaborated with Mansa Memorial Hospital and the Ejisu Municipal Health Directorate of the Ghana Health Service to educate women on the importance of early detection and regular screening.',
      'Through community engagement and health education, the initiative empowered women with life-saving knowledge, promoted preventive healthcare, and strengthened access to essential screening services.',
      'The Foundation continues to support efforts that create healthier, more informed, and resilient communities through collaboration and compassionate service.'
    ],
  },
  {
    id: 'district-upskilling',
    name: 'Community Skills & Mentorship',
    location: 'Ashanti Region',
    role: 'Economic Empowerment',
    tag: 'Economic Empowerment',
    tagColor: 'bg-brand-gold text-brand-navy',
    image: '/media/opt/IMG_4488.webp',
    imageAlt: 'A black and white portrait of a child looking into the camera during a community visit',
    quote: 'Lasting community progress starts with practical support and useful skills that help families secure independent livelihoods.',
    body: [
      'The work of the organization is guided by a heartfelt commitment to community development and youth mentorship. Founded by Prince Douglas Asamany, the organization\'s mission is to uplift every life with dignity and care.',
      'Through practical skills training and community workshops, the foundation focuses on delivering useful tools, education, and sustainable aid.',
      'This helps vulnerable families secure independent livelihoods rather than relying solely on short-term charity.',
      'By working directly with local chiefs, elders, and community groups across Ejisu, the foundation ensures every outreach brings genuine, long-term help directly to where it is needed most.'
    ],
  },
];

export interface PressItem {
  title: string;
  outlet: string;
  date: string;
  href: string;
  tag: string;
}

export const pressItems: PressItem[] = [
  {
    title: 'AFLAG Honors Prince Douglas Asamany with the 2025 Social Change Advocate Award',
    outlet: 'Choice News Online',
    date: 'Nov 19, 2025',
    tag: 'Award',
    href: 'https://choicenewsonline.com/aflag-honors-prince-douglas-asamany-with-the-2025-social-change-advocate-award/',
  },
  {
    title: 'Prince Douglas Asamany Receives Prestigious 2025 Social Change Advocate Award at Philanthropic Awards & Charity Night',
    outlet: 'Choice News Online',
    date: 'Nov 2025',
    tag: 'Award',
    href: 'https://choicenewsonline.com/prince-douglas-asamany-receives-prestigious-2025-social-change-advocate-award-at-philanthropic-awards-charity-night/',
  },
  {
    title: 'Early Screening Saves Lives: Senior Midwife Urges Women to Prevent Cervical Cancer',
    outlet: 'Choice News Online',
    date: 'Feb 1, 2026',
    tag: 'Healthcare',
    href: 'https://choicenewsonline.com/early-screening-saves-lives-senior-midwife-urges-women-to-prevent-cervical-cancer/',
  },
  {
    title: 'Go for Screening Early to Prevent Cervical Cancer: Health Professionals Advise Women in Ejisu',
    outlet: 'Choice News Online',
    date: 'Feb 1, 2026',
    tag: 'Healthcare',
    href: 'https://choicenewsonline.com/go-for-screening-early-to-prevent-cervical-cancer-health-professionals-advise-women-in-ejisu/',
  },
  {
    title: 'Cervical Cancer Is Preventable If Detected Early: Mansa Memorial Hospital Educates Women',
    outlet: 'Choice News Online',
    date: 'Feb 1, 2026',
    tag: 'Healthcare',
    href: 'https://choicenewsonline.com/cervical-cancer-is-preventable-if-detected-early-mansa-memorial-hospital-educates-women/',
  },
  {
    title: 'Prince Asamany Foundation Fetes Over 800 Street Children and Mentally Ill Persons in Christmas Celebration',
    outlet: 'Choice News Online',
    date: 'Dec 27, 2024',
    tag: 'Social Welfare',
    href: 'https://choicenewsonline.com/prince-asamany-foundation-fetes-over-800-street-children-and-mentally-ill-persons-in-christmas-celebration/',
  },
];
