import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    return res.status(500).json({ 
      status: "❌ Error", 
      message: "MONGODB_URI is missing from Vercel Environment Variables." 
    });
  }

  const client = new MongoClient(uri);

  try {
    // Attempt to connect and ping the database
    await client.connect();
    const db = client.db('Handover');
    await db.command({ ping: 1 }); // The actual handshake

    res.status(200).json({ 
      status: "✅ Success", 
      message: "Connection to MongoDB Atlas is stable!",
      database: "Handover"
    });
  } catch (error) {
    res.status(500).json({ 
      status: "❌ Connection Failed", 
      message: error.message 
    });
  } finally {
    await client.close();
  }
}