const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('./config');

const User = require('./models/User');
const Course = require('./models/Course');
const Video = require('./models/Video');
const Problem = require('./models/Problem');

async function run() {
  await mongoose.connect(config.mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Video.deleteMany({}),
    Problem.deleteMany({})
  ]);

  const passwordHash = await bcrypt.hash('Password@123', 10);
  await User.create({ username: 'harry', email: 'harry@example.com', passwordHash });

  await Course.insertMany([
    {
      title: 'DBMS - Placement Sheet',
      description:
        'Database Management Systems (DBMS) is a core subject for placements. This sheet contains curated topics, resources, and structured practice to help you master DBMS efficiently.',
      level: 'Intermediate',
      playlistUrl: 'https://www.youtube.com/',
      relatedTopics: ['SQL', 'Normalization', 'Transactions', 'Indexing'],
      sections: [
        { title: 'Explore the Complete Playlist', body: 'Watch the full playlist to cover DBMS end-to-end and revisit weak areas.' },
        { title: 'Support the creators', body: 'If you find the resources helpful, like, share, and subscribe to support the creators.' }
      ],
      lectures: [
        { title: 'Introduction to DBMS', duration: '12:20' },
        { title: 'ER Model & Keys', duration: '18:05' },
        { title: 'Normalization', duration: '22:40' }
      ]
    },
    {
      title: 'DSA Foundations',
      description: 'Arrays, strings, recursion, sorting, and core DSA patterns.',
      level: 'Beginner',
      playlistUrl: 'https://www.youtube.com/',
      relatedTopics: ['Arrays', 'Strings', 'Recursion', 'Sorting'],
      sections: [{ title: 'Getting Started', body: 'Build strong fundamentals with structured lessons and practice.' }],
      lectures: [
        { title: 'Big-O & Complexity', duration: '14:10' },
        { title: 'Arrays & Prefix Sums', duration: '21:55' }
      ]
    },
    {
      title: 'System Design Basics',
      description: 'Learn core patterns, scalability concepts, and interview-ready thinking.',
      level: 'Intermediate',
      playlistUrl: 'https://www.youtube.com/',
      relatedTopics: ['Caching', 'Load Balancing', 'Databases'],
      sections: [{ title: 'Core Concepts', body: 'Understand scalability and key architecture patterns.' }],
      lectures: [
        { title: 'Scalability Basics', duration: '17:30' },
        { title: 'Caching', duration: '16:10' }
      ]
    }
  ]);

  await Video.insertMany([
    { title: 'DSA Basics', youtubeId: '8hly31xKli0', channel: 'FreeCodeCamp' },
    { title: 'React Fundamentals', youtubeId: 'bMknfKXIFA8', channel: 'FreeCodeCamp' },
    { title: 'Node.js Crash Course', youtubeId: 'fBNz5xF-Kx4', channel: 'Traversy Media' },
    { title: 'SQL Tutorial', youtubeId: 'HXV3zeQKqGY', channel: 'FreeCodeCamp' },
    { title: 'Java Basics', youtubeId: 'eIrMbAQSU34', channel: 'Bro Code' },
    { title: 'C++ STL', youtubeId: 'RBSGKlAvoiM', channel: 'CP' }
  ]);

  await Problem.insertMany([
    {
      title: 'Reverse the Stack',
      shortDescription:
        'Given a stack [1,2,3,4,5] where 5 is the top, reverse the stack such that [5,4,3,2,1] where 1 is the top',
      description:
        'You are given N integers representing a stack from bottom to top. Print the reversed stack from bottom to top.',
      difficulty: 'Easy',
      tags: ['Stack', 'DSA', 'Easy'],
      constraints: ['1 <= N <= 10^5'],
      input: 'First line contains N, then N integers representing the stack from bottom to top.',
      output: 'Print the reversed stack from bottom to top.',
      samples: [{ input: '5\n1 2 3 4 5', output: '5 4 3 2 1' }],
      sampleTests: [{ input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' }],
      hiddenTests: [{ input: '3\n10 20 30', expectedOutput: '30 20 10' }]
    },
    {
      title: 'Pre order traversal of binary tree',
      shortDescription:
        'Given a binary tree, return an array which has the traversal of the tree, in a preorder manner',
      description:
        'Given a tree in adjacency list format, print preorder traversal. (Simplified demo problem)',
      difficulty: 'Easy',
      tags: ['Binary Tree', 'DSA', 'Easy'],
      constraints: ['1 <= N <= 10^5'],
      input: 'Input format depends on platform. For demo: not required.',
      output: 'Print preorder traversal.',
      samples: [{ input: 'N/A', output: 'N/A' }],
      sampleTests: [{ input: '', expectedOutput: '' }],
      hiddenTests: [{ input: '', expectedOutput: '' }]
    },
    {
      title: 'is BST',
      shortDescription:
        'Given a binary Tree, find out if the binary tree is a binary search tree or not',
      description:
        'Given a tree, determine whether it is a BST. (Simplified demo problem)',
      difficulty: 'Easy',
      tags: ['Binary Search Tree', 'DSA', 'Easy'],
      constraints: ['1 <= N <= 10^5'],
      input: 'Input format depends on platform. For demo: not required.',
      output: 'Print true/false.',
      samples: [{ input: 'N/A', output: 'N/A' }],
      sampleTests: [{ input: '', expectedOutput: '' }],
      hiddenTests: [{ input: '', expectedOutput: '' }]
    }
  ]);

  console.log('Seed completed. Demo user: harry@example.com / Password@123');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
