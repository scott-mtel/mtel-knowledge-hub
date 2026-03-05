import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Use POST');

  // ✅ FIX: Look for the header, not the body
  const incomingSecret = req.headers['x-admin-secret']; 
  const serverSecret = process.env.ADMIN_SECRET;

  if (incomingSecret !== serverSecret) {
    return res.status(401).json({ error: 'Auth failed. Check Secret.' });
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('Handover');
    
    // We remove 'secret' from here because it's in the headers now
    const projectData = {
      projectName: req.body.projectName,
      featureTitle: req.body.featureTitle,
      description: req.body.description,
      links: req.body.links,
      note: req.body.note, // Added this back in case you use internal notes
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