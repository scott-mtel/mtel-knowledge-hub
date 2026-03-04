import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('Handover');
    // Fetch all projects, sorted by newest first
    const projects = await db.collection('Projects')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}