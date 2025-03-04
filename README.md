# Todo Fullstack App

A full-stack Todo application built with Next.js (frontend) and Node.js with PostgreSQL (backend).

## 🚀 Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/shardulkumar123/todo-fullstack-app.git
cd todo-fullstack-app
```

### Step 2: Configure Environment Variables
- Check `.env.example` files in both the frontend and backend folders.
- Copy `.env.example` to `.env` and add the required environment variables.

### Step 3: Install Dependencies
```bash
# Install dependencies for both frontend and backend
npm install
```

### Step 4: Install PostgreSQL & pgAdmin (If Not Installed)
- Install **PostgreSQL** and **pgAdmin** on your local machine.
- Skip this step if already installed.

### Step 5: Create a Database
- Create a new PostgreSQL database.
- Use the database name you configured in the `.env` file.

### Step 6: Setup Completed 🎉

### Step 7: Run the Application
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in another terminal)
cd frontend
npm run dev
```

### Step 8: Verify Everything is Running
- **Frontend** runs on `http://localhost:3000`
- **Backend** runs on `http://localhost:5000`
- Ensure the database is successfully connected to the backend.

## 🛠 Tech Stack
- **Frontend:** Next.js, React, Material UI
- **Backend:** Node.js, Express.js, PostgreSQL
- **Database Management:** pgAdmin

## 📌 Notes
- If you face any issues, ensure that the database credentials in `.env` are correct.
- Restart the backend server after modifying `.env`.


