## Description
This Github repo contains a HDocs, a web application that allows users to create, edit, and collaborate on documents in real-time. The clone is built using modern web development technologies, including React, Firebase, and Quill.

## DEMO [HDocs](https://hdocs.netlify.app/)

### Features:
The HDocs includes the following features:

1. Document creation and editing: Users can create new documents and edit existing documents using a rich text editor.
2. User authentication: Users must sign in with a Google account to use the application.Frebas
3. User permissions: Users can be given read-only or read-write access to documents.
4 .Document sharing: Users can share documents with other users via email.

### Getting Started
To get started with the Google Docs clone, follow these steps:

1. Clone the repo to your local machine.
2. Install the required dependencies by running `npm install` in both the `client` and `server` directories.
3. Create a `.env` file in the `server` directory with the following variables:
    VITE_API_kEY = YOUR_VITE_API_kEY
    VITE_AUTH_DOMAIN = YOUR_VITE_AUTH_DOMAIN
    VITE__PROJECT_ID = YOUR_VITE__PROJECT_ID
    VITE__STORAGE_BUCKET = YOUR_VITE__STORAGE_BUCKET
    VITE__MESSAGING_SENDER_ID = YOUR_VITE__MESSAGING_SENDER_ID
    VITE__APP_ID = YOUR_VITE__APP_ID

4. Start the server by running npm run DevStart in the server directory.
5. Start the client by running npm run dev in the client directory.
6. Open the application in your web browser at http://localhost:5173.

Contributing
Contributions to the Google Docs clone are welcome! To contribute, please fork the repo and submit a pull request.
