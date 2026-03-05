import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).send('Use PUT');

  if (req.headers['x-admin-secret'] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('Handover');
    const { id, ...updateData } = req.body;
    // Safety: MongoDB doesn't like _id being in the $set object
    delete updateData._id;

    await db.collection('Projects').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}