# Task Tracker Backend

This is the backend part of the Task Tracker project.  
It is made with Node.js, Express, MongoDB and Firebase .  
It provides APIs for tasks and checks Firebase tokens.

# How to Run
  Follow these steps:
  
  1. Clone this repo  
     ```bash
     git clone https://github.com/panhalepritiwork-intern/BE
     cd BE
     
  2. Install packages:

    npm install

  3.Add .env file in project root with this content:

    MONGO_URI=your_mongo_url
    PORT=5000

  4.Add Firebase service account key file
    
    Download JSON from Firebase Console-----Service Accounts
    Save it as serviceAccountKey.json inside backend folder

  5. Start server
 
    npm run dev
    Server runs at http://localhost:5000

  #Features:
    
    -APIs for tasks (Create, Read, Update, Delete)
    -Firebase ID token verification middleware
    -Controllers with console logs
    -MongoDB to store tasks and users

#Sample API Calls:
     
1. Get all tasks (with token)

        GET http://localhost:5000/api/tasks
        Headers:
        Authorization: Bearer <FIREBASE_ID_TOKEN>

2. Create new task

        POST http://localhost:5000/api/tasks
        Headers:
        Authorization: Bearer <FIREBASE_ID_TOKEN>
       Body (JSON):
        {
          "title": "My First Task",
          "description": "This is a sample task",
          "status": "pending"
        }
                 
3. Update task

        PUT http://localhost:5000/api/tasks/<TASK_ID>
        Headers:
        Authorization: Bearer <FIREBASE_ID_TOKEN>
        Body (JSON):
        {
          "title": "Updated Task",
          "status": "in-progress"
        }


5. Delete task

        DELETE http://localhost:5000/api/tasks/<TASK_ID>
        Headers:
        Authorization: Bearer <FIREBASE_ID_TOKEN>

