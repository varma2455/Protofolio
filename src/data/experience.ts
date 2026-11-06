import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    company: 'Blackbucks Engineers',
    position: 'MERN Stack Developer Intern',
    duration: 'May 2026 – June 2026',
    periodBadge: 'Summer Internship',
    location: 'India',
    description:
      'Engineered full-stack web solutions across the MERN stack, designing responsive React component hierarchies, authoring RESTful API routes in Express, and structuring MongoDB schemas for persistent business applications.',
    responsibilities: [
      'Engineered responsive user interfaces using React.js, optimizing component reusability and state management.',
      'Built scalable REST APIs using Node.js and Express.js to facilitate seamless data communication.',
      'Designed and integrated MongoDB database schemas, streamlining data persistence and API retrieval.',
      'Managed code versioning using Git/GitHub and collaborated with team members to test and debug application features.',
      'Conducted endpoint verification, request payload validation, and integrated client-server data streams.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git', 'GitHub', 'Postman'],
    highlights: [
      'Engineered end-to-end data flow between React client and Express API endpoints.',
      'Implemented clean schema constraints and indexed Mongoose models.',
      'Maintained consistent version control practices across multi-developer sprints.',
    ],
  },
  {
    company: '1Stop.ai',
    position: 'Web Development Intern',
    duration: 'February 2026 – March 2026',
    periodBadge: 'Technical Internship',
    location: 'India',
    description:
      'Developed foundational web modules, created responsive cross-browser layouts using HTML5, CSS3, and modern JavaScript, and conducted technical analysis on data trends.',
    responsibilities: [
      'Developed functional web applications using HTML, CSS, and JavaScript.',
      'Collaborated with peers to design, test, and debug application modules.',
      'Analyzed dataset trends and built clean data visualizations using Python.',
      'Completed a hands-on capstone project matching industry standards.',
      'Refactored legacy DOM manipulation routines into modern JavaScript event patterns.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Python Data Visualization', 'Responsive Web Design', 'Git'],
    highlights: [
      'Shipped complete industry-standard capstone web project.',
      'Strengthened cross-browser layout resilience and DOM performance.',
      'Developed Python-assisted data visualization routines to inspect trends.',
    ],
  },
];
