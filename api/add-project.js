import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Use POST');

  // Security Check
  if (req.body.secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Wrong Secret' });
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('Handover');
    
    const projectData = {
      projectName: req.body.projectName,
      featureTitle: req.body.featureTitle,
      description: req.body.description,
      links: req.body.links,
      note: req.body.note,
      createdAt: new Date()
    };

    await db.collection('Projects').insertOne(projectData);
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}