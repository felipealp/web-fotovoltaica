export const pages = [
  {  
    authOnly: false,  
    pages: [
      {
        title: 'Home',
        href: './',
        authHide: false,
      },      
      {
        title: 'About',
        href: '/about',
        authHide: false,
      },
      {
        title: 'Search',
        href: '/search',
        authHide: false,
      },
      {
        title: 'Contact',
        href: '/contact',
        authHide: false,
      },      
      {
        title: 'Login',
        href: '/login',
        authHide: true,        
      },  
      {
        title: 'Sign up',
        href: '/signup', 
        authHide: true,       
      }, 
      {
        title: 'Forgot Password',
        href: '/forgot-password', 
        authHide: true,       
      },           
    ],
  },
  {
    title: 'My Stuff',
    id: 'my-stuff',
    authOnly: true,
    pages: [
      {
        title: 'Profile',
        href: '/my-profile',
        authHide: false,
      },
      {
        title: 'Settings',
        href: '/my-settings',
        authHide: false,
      },
      {
        title: 'Notifications',
        href: '/my-notifications',
        authHide: false,
      },
      {
        title: 'Logout',
        href: '/logout',
        authHide: false,
      },      
    ],
  },
  {
    title: 'Landing Pages',
    id: 'landing-pages',
    authOnly: false,
    pages: [
      {
        title: 'Advertisement',
        href: '/landing-advertisement',
        authHide: false,
      },
      {
        title: 'Payment App',
        href: '/landing-payment-app',
        authHide: false,
      },
      {
        title: 'Marketing',
        href: '/landing-marketing',
        authHide: false,
      },
      {
        title: 'Software Company',
        href: '/landing-software-company',
        authHide: false,
      },
      {
        title: 'Course',
        href: '/landing-course',
        authHide: false,
      },
      {
        title: 'Crypto Currency',
        href: '/landing-crypto',
        authHide: false,
      },
      {
        title: 'Design Agency',
        href: '/landing-design-agency',
        authHide: false,
      },
      {
        title: 'Consulting',
        href: '/landing-consulting',
        authHide: false,
      },
      {
        title: 'Application',
        href: '/landing-application',
        authHide: false,
      },
      {
        title: 'Domain Hosting',
        href: '/landing-domain-hosting',
        authHide: false,
      },
      {
        title: 'Travel',
        href: '/landing-travel',
        authHide: false,
      },
      {
        title: 'Event',
        href: '/landing-event',
        authHide: false,
      },
    ],
  },
  {
    title: 'Supporting Pages',
    id: 'supporting-pages',
    authOnly: false,
    pages: [      
      {
        title: 'Services',
        href: '/page-services',
        authHide: false,
      },      
      {
        title: 'Pricing',
        href: '/page-pricing',
        authHide: false,
      },
      {
        title: 'Customers',
        href: '/page-customers',
        authHide: false,
      },
      {
        title: 'Hire Us',
        href: '/page-hire-us',
        authHide: false,
      },
      {
        title: 'FAQ',
        href: '/page-faq',
        authHide: false,
      },
      {
        title: 'Privacy Policy',
        href: '/page-privacy',
        authHide: false,
      },
      {
        title: 'Coming Soon',
        href: '/page-coming-soon',
        authHide: false,
      },
      {
        title: 'Maintenance Mode',
        href: '/page-maintenance-mode',
        authHide: false,
      },
      {
        title: 'Cover',
        href: '/page-cover',
        authHide: false,
      },
      {
        title: 'Not Found',
        href: '/page-not-found',
        authHide: false,
      },
    ],
  },  
];
