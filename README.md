🚀 Mtel Project Knowledge Hub
A high-performance, serverless documentation portal built with HTML5, Tailwind CSS, MongoDB Atlas, and Vercel Functions. This hub allows the team to store, search, and share project-specific knowledge, task handovers, and technical resources.

🛠 Features
Live Search: Instant filtering across project names and feature titles.

Deep Linking: Every record has a unique URL (via ?id=) for easy sharing.

Smart Caching: Uses localStorage to reduce MongoDB traffic and ensure sub-second load times.

WYSIWYG Editing: Integrated with Quill.js for rich-text descriptions and resource links.

Administrative Suite: Dedicated /admin.html for entries and /manage.html for database maintenance.

🏗 System Architecture
The project follows a Serverless JAMstack pattern:

Frontend: Static HTML/Tailwind hosted on Vercel.

Backend: Node.js Serverless Functions (/api folder).

Database: MongoDB Atlas (NoSQL) for flexible document storage.

Security: Protected by a custom ADMIN_SECRET environment variable.

📖 How to Use
Adding Knowledge
Navigate to /admin.html.

Enter the Project Name (e.g., CRYPTOMIND) and Feature Title.

Use the rich-text editors for the description and links.

Enter the Admin Secret and click Publish.

Managing & Editing
Navigate to /manage.html.

Search for the record you wish to change.

Click the Blue Edit Icon to load the data back into the admin form.

Click the Red Trash Icon to permanently delete a record.

Sharing Links
On the main index.html, click the Link Icon on any row.

The unique URL will be copied to your clipboard. When shared, this link automatically opens the project modal for the recipient.

⚡ Technical Setup (Internal)
Environment Variables
To run this project, you must set the following in your Vercel Dashboard:

MONGODB_URI: Your MongoDB Atlas connection string.

ADMIN_SECRET: The password required for POST, PUT, and DELETE actions.

API Endpoints
GET /api/get-projects: Fetches all records (Sorted by createdAt).

POST /api/add-project: Creates a new record.

PUT /api/update-project: Updates existing records via ObjectId.

DELETE /api/delete-project: Removes a record from the Projects collection.

🧹 Maintenance
The frontend caches data for 10 minutes. To force an update after manual database changes, you can clear your browser's local storage or use the "Update/Delete" flow in manage.html, which triggers an automatic cache clear.