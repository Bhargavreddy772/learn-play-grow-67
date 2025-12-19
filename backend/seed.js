const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'learn_play_grow';

const sample = {
  users: [
    { _id: 'u1', name: 'Alex', role: 'student', email: 'alex@example.com' },
    { _id: 'u2', name: 'Mrs. Johnson', role: 'teacher', email: 'johnson@example.com' }
  ],
  subjects: [
    { _id: 'math', key: 'math', title: 'Math', description: 'Basic math', order: 1 },
    { _id: 'english', key: 'english', title: 'English', description: 'Reading & writing', order: 2 }
  ],
  badges: [
    { _id: 'star', key: 'star', label: 'Stars', criteria: 'Earn stars' }
  ],
  leaderboard: [
    { userId: 'u2', name: 'Mrs. Johnson', points: 3000, streak: 20 },
    { userId: 'u1', name: 'Alex', points: 1890, streak: 7 }
  ],
  videos: [
    { _id: 'v1', title: 'Counting Fun', thumbnail: '', url: 'https://example.com/video/1' }
  ],
  events: [
    { _id: 'e1', title: 'Math Contest', date: '2025-12-20', type: 'contest' }
  ],
  progress: [
    { userId: 'u1', subjectKey: 'math', percent: 75, lessonsCompleted: 15, totalLessons: 20 }
  ]
};

async function seed() {
  console.log('Connecting to', MONGODB_URI);
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    console.log('Connected to DB:', DB_NAME);

    // Insert / replace sample data
    await Promise.all([
      db.collection('users').deleteMany({}),
      db.collection('subjects').deleteMany({}),
      db.collection('badges').deleteMany({}),
      db.collection('leaderboard').deleteMany({}),
      db.collection('videos').deleteMany({}),
      db.collection('events').deleteMany({}),
      db.collection('progress').deleteMany({})
    ]);

    await Promise.all([
      db.collection('users').insertMany(sample.users),
      db.collection('subjects').insertMany(sample.subjects),
      db.collection('badges').insertMany(sample.badges),
      db.collection('leaderboard').insertMany(sample.leaderboard),
      db.collection('videos').insertMany(sample.videos),
      db.collection('events').insertMany(sample.events),
      db.collection('progress').insertMany(sample.progress)
    ]);

    console.log('Seed data inserted.');
    console.log('Collections: users, subjects, badges, leaderboard, videos, events, progress');
    console.log(`DB URL: ${MONGODB_URI}/${DB_NAME}`);
  } catch (err) {
    console.error('Seed failed:', err.message);
    console.error('If you do not have MongoDB running locally, set MONGODB_URI env or install MongoDB.');
  } finally {
    await client.close();
  }
}

seed();
