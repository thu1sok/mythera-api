require('dotenv').config();
const mongoose = require('mongoose');

async function migrate() {
    console.log("Connecting to MongoDB:", process.env.MONGODB_URI.replace(/(:).*(@)/, ':***@'));
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    
    const targetCollections = [
        'subraces', 'races', 'npcs', 'factions', 
        'gods', 'eternals', 'characters', 'places'
    ];
    
    for (const name of targetCollections) {
        try {
            const coll = await db.collection(name);
            if (coll) {
                const result = await coll.updateMany(
                    { image: { $exists: true } }, 
                    { $rename: { "image": "imageUrl" } }
                );
                console.log(`Updated ${result.modifiedCount} records in ${name}.`);
            }
        } catch (err) {
            console.log(`Collection ${name} failed to update:`, err.message);
        }
    }

    await mongoose.disconnect();
    console.log("Database migration complete.");
}

migrate().catch(console.error);
