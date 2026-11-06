import { EducationItem } from '../types';

export const educationData: EducationItem[] = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'SRKR Engineering College',
    location: 'Bhimavaram, Andhra Pradesh',
    duration: '2023 – 2027',
    score: '6.99',
    scoreType: 'CGPA',
    focus: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (OOP)',
      'Database Management Systems (DBMS)',
      'Operating Systems & Computer Networks',
      'Web Technologies & Cloud Fundamentals',
    ],
  },
  {
    degree: 'Class XII (Intermediate / Higher Secondary)',
    institution: 'Aditya Junior College',
    location: 'Palakol, Andhra Pradesh',
    duration: '2021 – 2023',
    score: '85.3%',
    scoreType: 'Percentage',
    focus: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Analytical Logic & Quantitative Problem Solving',
    ],
  },
  {
    degree: 'Class X (Secondary School Certificate)',
    institution: 'Aditya School',
    location: 'Andhra Pradesh',
    duration: '2021',
    score: '93.16%',
    scoreType: 'Percentage',
    focus: [
      'Mathematics & Science Excellence',
      'Computer Fundamentals',
      'Language & Communication Skills',
    ],
  },
];

export const certificationsData = [
  {
    title: 'Java FullStack Certification',
    issuer: 'Eduskills',
    description: 'Comprehensive certification covering OOP foundations, Java application architecture, and full-stack software development.',
    badge: 'Certified',
  },
  {
    title: 'MERN Stack Development Internship',
    issuer: 'Blackbucks Engineers',
    description: 'Hands-on intensive development in React.js, Node.js, Express.js, MongoDB, REST APIs, and collaborative Git/GitHub workflows.',
    badge: 'Completed',
  },
  {
    title: 'Hackathons & Technical Symposia',
    issuer: 'SRKR Engineering College & Regional Events',
    description: 'Active participant in competitive hackathons and coding tournaments, developing functional prototypes within tight timeframes.',
    badge: 'Participant',
  },
];
