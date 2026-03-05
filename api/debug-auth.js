export default async function handler(req, res) {
  const incomingSecret = req.headers['x-admin-secret'];
  const serverSecret = process.env.ADMIN_SECRET;

  res.status(200).json({
    receivedHeader: incomingSecret ? "Yes (Hidden for safety)" : "No Header Received",
    serverHasSecret: serverSecret ? "Yes" : "No (Environment Variable Missing!)",
    isMatch: incomingSecret === serverSecret,
    method: req.method
  });
}