This Github repo contains a HDocs, a web application that allows users to create, edit, and collaborate on documents in real-time. The clone is built using modern web development technologies, including React, Firebase, and Quill.

Features
The HDocs includes the following features:

Document creation and editing: Users can create new documents and edit existing documents using a rich text editor.
User authentication: Users must sign in with a Google account to use the application.Frebas
User permissions: Users can be given read-only or read-write access to documents.
Document sharing: Users can share documents with other users via email.

Getting Started
To get started with the Google Docs clone, follow these steps:

Clone the repo to your local machine.
Install the required dependencies by running npm install in both the client and server directories.
Create a .env file in the client directory with the following variables:
makefile
Copy code
MONGODB_URI=<your MongoDB URI>
GOOGLE_CLIENT_ID=<your Google API client ID>
GOOGLE_CLIENT_SECRET=<your Google API client secret>
SESSION_SECRET=<a secret string for session management>

Start the server by running npm run DevStart in the server directory.
Start the client by running npm run dev in the client directory.
Open the application in your web browser at http://localhost:5173.

Contributing
Contributions to the Google Docs clone are welcome! To contribute, please fork the repo and submit a pull request.
