import config from '~/config.json';

export const navLinks = [
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Details',
    pathname: '/#details',
  },
  {
    label: 'Articles',
    pathname: '/articles',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'LinkedIn',
    url: `https://www.linkedin.com/in/${config.linkedin}`,
    icon: 'linkedin',
  },
  {
    label: 'Medium',
    url: `https://medium.com/${config.medium}`,
    icon: 'medium',
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
  {
    label: 'Resume',
    url: 'https://docs.google.com/document/d/1DN_PlXWmavWTdhggll8npn0q7wLxeANjFWPr1x8Ffac/edit?usp=sharing',
    icon: 'file',
  },
];
