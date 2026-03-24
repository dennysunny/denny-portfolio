import { PortfolioContent } from '../models/portfolio.model';

export const DEFAULT_PORTFOLIO_CONTENT: PortfolioContent = {
  info: {
    name: 'Denny Sunny',
    tagline: 'Available for new opportunities',
    subtitle:
      'Senior Frontend Engineer specialising in Angular — building scalable enterprise applications with reactive architecture, Angular Signals, and pixel-perfect user interfaces.',
    available: true,
    email: 'iamdennysunny@gmail.com',
    phone: '+91 9961282177',
  },

  stats: [
    { num: '5+', label: 'Years of Experience' },
    { num: '3',  label: 'Companies' },
    { num: 'v18', label: 'Angular Expertise' },
  ],

  experiences: [
    {
      id: 'exp-1',
      period: 'Dec 2024 — Present',
      company: 'Experion Technologies',
      role: 'Senior Software Engineer — ',
      roleHighlight: 'Frontend (Angular)',
      bullets: [
        'Architecting scalable Angular 17/18 apps using Signals & Effects for reactive state management and optimised change detection',
        'Designed feature-based modular architecture with lazy loading and shared libraries for long-term scalability',
        'Built highly reusable, configurable UI components and dynamic form workflows with complex validation',
        'Created custom form controls using NgValueAccessor and NgValidators',
        'Mentored junior developers on modern Angular patterns, reactive design, and production debugging',
        'Owned features end-to-end — from requirement analysis to production deployment',
      ],
    },
    {
      id: 'exp-2',
      period: 'Sep 2023 — Nov 2024',
      company: 'Logicplum',
      role: 'Frontend Developer — ',
      roleHighlight: 'Angular / React Native',
      bullets: [
        'Developed production-grade Angular apps with modular architecture and reactive state using Signals & RxJS',
        'Implemented real-time notifications for Web & Mobile using WebSockets',
        'Built complex UI workflows with conditional rendering, dynamic configs, and role-based behaviour',
        'Integrated REST APIs with structured data mapping, error handling, and loading-state management',
        'Refactored legacy components into scalable, reusable, and testable modules',
        'Delivered responsive, high-performance UI using Tailwind CSS',
      ],
    },
    {
      id: 'exp-3',
      period: 'Oct 2020 — Aug 2023',
      company: 'National Australia Bank via Infosys',
      role: 'SDET — ',
      roleHighlight: 'Frontend & Testing',
      bullets: [
        'Maintained both development and testing for enterprise banking applications',
        'Contributed to improving loan application workflows, enhancing usability and UX',
        'Identified, debugged, and resolved UI defects ensuring stability and regression safety',
        'Worked in a collaborative Agile environment with developers, testers, and business stakeholders',
      ],
    },
  ],

  skillGroups: [
    {
      id: 'sg-1',
      icon: '⚡',
      title: 'Frontend Technologies',
      tags: ['Angular v8–v18', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'React Native'],
    },
    {
      id: 'sg-2',
      icon: '🔄',
      title: 'Reactive & State',
      tags: ['Angular Signals', 'RxJS', 'Observables', 'Reactive Forms', 'WebSockets', 'Shared Stores'],
    },
    {
      id: 'sg-3',
      icon: '🏗️',
      title: 'Architecture',
      tags: ['Modular Design', 'Lazy Loading', 'Route Guards', 'DI Patterns', 'Lifecycle Hooks', 'Feature Modules'],
    },
    {
      id: 'sg-4',
      icon: '🚀',
      title: 'Performance',
      tags: ['Change Detection', 'OnPush Strategy', 'Code Splitting', 'Bundle Optimization', 'Render Optimization'],
    },
    {
      id: 'sg-5',
      icon: '🧪',
      title: 'Testing & Quality',
      tags: ['Jest', 'Unit Testing', 'Integration Testing', 'ESLint', 'Code Reviews', 'Regression Testing'],
    },
    {
      id: 'sg-6',
      icon: '🛠️',
      title: 'Tools & Practices',
      tags: ['Git', 'Webpack', 'Agile / Scrum', 'REST APIs', 'PR Reviews', 'Mentoring'],
    },
  ],

  about: {
    location: 'Kakkanad, Ernakulam, Kerala, India',
    bio: [
      "I'm <strong>Denny Sunny</strong>, a Senior Frontend Engineer based in <strong>Kakkanad, Ernakulam, Kerala</strong>. Over 5 years I've specialised deeply in the Angular ecosystem — from v8 right through to Angular 18 with Signals.",
      'My background is unusual: I started with a <strong>BSc in Physics</strong>, then transitioned into technology through an MCA. That scientific foundation gave me a rigorous, systems-thinking approach to engineering.',
      'I care deeply about <strong>code quality</strong>, <strong>scalable architecture</strong>, and building things that teams can maintain confidently over the long term. I\'ve mentored junior developers, led code reviews, and owned full-stack frontend features from whiteboard to production.',
      'Outside of work, I stay current with the Angular roadmap and love exploring patterns in reactive programming.',
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Master of Computer Applications (MCA)',
        school: 'Saintgits College of Engineering, Kottayam',
        year: '2017 — 2020',
      },
      {
        id: 'edu-2',
        degree: 'BSc Physics',
        school: 'St. Berchmans College, Changanacherry',
        year: '2014 — 2017',
      },
    ],
  },

  contactLinks: [
    { id: 'c-1', icon: '✉',  label: 'iamdennysunny@gmail.com', href: 'mailto:iamdennysunny@gmail.com' },
    { id: 'c-2', icon: '📞', label: '+91 9961282177',           href: 'tel:+919961282177' },
    { id: 'c-3', icon: 'in', label: 'LinkedIn',                 href: 'https://linkedin.com/in/dennysunny' },
    { id: 'c-4', icon: '⌥',  label: 'GitHub',                  href: 'https://github.com/dennysunny' },
  ],
};
