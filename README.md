# Commenting Service for Blog Posts
 I created a full-stack commenting service that can be integrated with blog posts, allowing users to add, edit, delete, and reply to comments. Initially, I developed this as a separate project to gain comprehensive experience in both frontend and backend development. Later, I plan to implement this service into the BRDG platform.
## Key Features:
* Users can interact with the service by adding new comments, editing or deleting their own comments, and replying to others.
*	The service supports threaded comments, allowing replies to be nested under the original comment.
*	Real-time updates are enabled through React Query for efficient data fetching and synchronization.
*	The comment count automatically updates whenever new comments are added, providing users with up-to-date information.
*	The backend is built with Node.js and a RESTful API handles all comment-related actions, backed by a SQL database for persistent storage.
## Technology Stack:
###	Backend Development:
* I built a RESTful API using Node.js and Express, ensuring efficient CRUD operations.
*	I implemented a SQLite3 database using Knex.js for query building and management, designing the schema to handle nested comment threads.

###	Frontend Development:
*	I built the frontend interface using React and TypeScript, ensuring a responsive and user-friendly design.
*	I integrated the frontend with the backend API, managing state with React's context API and hooks.
*	I styled the application using Tailwind CSS, ensuring consistency with modern design standards.
  
This project was a valuable learning experience, providing insights into full-stack development. It will enhance the BRDG platform by offering an integrated commenting feature.
