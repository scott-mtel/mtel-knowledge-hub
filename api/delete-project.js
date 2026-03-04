import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).send('Use DELETE');

  // Security Check
  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('Handover');
    const { id } = req.query;

    const result = await db.collection('Projects').deleteOne({ _id: new ObjectId(id) });

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