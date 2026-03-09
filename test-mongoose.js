const mongoose = require('mongoose');

// Need to compile typescript file first to ensure we use dist
const { NarrativeArcSchema } = require('./dist/schema/narrative-arcs/narrative-arc.schema');

async function test() {
  await mongoose.connect('mongodb://localhost:27017/mythera-map'); // assuming typical URL but actually let's try reading the env
  console.log("Connected to MongoDB!");
  
  const Arc = mongoose.model('NarrativeArc', NarrativeArcSchema);
  
  // Create a new arc manually
  const arc = new Arc({
    title: "Test Mongoose Title",
    descriptionHtml: "<p>Test</p>",
    sessions: [{
      title: "This is a Session Title",
      type: "Quest",
      startLevel: 1
    }]
  });
  
  await arc.save();
  console.log("Saved directly with Mongoose. Result:", JSON.stringify(arc.toJSON(), null, 2));

  mongoose.disconnect();
}

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mythera-map').then(() => test()).catch(console.error);
