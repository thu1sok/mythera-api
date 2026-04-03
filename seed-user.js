require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI in environment!');
    process.exit(1);
  }
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const hash = await bcrypt.hash('@eropuert0', 10);
  const user = {
    username: 'MytheraAppDM',
    password: hash,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  await db.collection('users').updateOne(
    { username: 'MytheraAppDM' },
    { $set: user },
    { upsert: true }
  );
  console.log('User MytheraAppDM seeded successfully!');
  process.exit(0);
}

seed().catch(console.error);
