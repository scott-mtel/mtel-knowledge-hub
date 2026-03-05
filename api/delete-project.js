import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).send('Use DELETE');

  // 1. Security Check
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID is required' });

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('Handover');
    
    // 2. Capture the result of the deletion
    const result = await db.collection('Projects').deleteOne({ 
      _id: new ObjectId(id) 
    });

    // 3. Verify if something was actually removed
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}