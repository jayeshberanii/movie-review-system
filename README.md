# Movie Review System

A full-stack movie review system with features such as adding movies, reviewing movies, filtering, and sorting movies based on ratings and other parameters.

This project consists of two parts:
- **Frontend**: Built with **Next.js** (React-based framework).
- **Backend**: Built with **Node.js** and **Express** using **MongoDB** as the database.

---

## **Project Setup Guide**

### Prerequisites

- **Node.js** and **npm** (Node Package Manager) installed
- **MongoDB** installed locally or a **MongoDB Atlas** account for cloud database
- **Next.js** for the frontend and **Express.js** for the backend

### **Frontend Setup (Next.js)**

#### Step 1: Clone the repository

```bash
git clone https://github.com/jayeshberanii/movie-review-system.git
cd movie-review-system
```

# Movie Review Application

This project is a full-stack movie review application with a frontend built using Next.js and a backend built using Node.js, Express, and MongoDB. Below are the instructions to set up and run the application locally.

## Prerequisites

- **Node.js**: Ensure Node.js is installed (version 16 or higher recommended).
- **MongoDB**: Install MongoDB locally or use MongoDB Atlas for a cloud-based database.
- **npm**: Comes with Node.js installation.

## Project Setup

### Frontend Setup (Next.js)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install the dependencies**:
   Run the following command to install all necessary dependencies for the frontend:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env.local` file in the `frontend` directory and add the following:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```
   *Note*: Change the URL if your backend is hosted on a different server or port.

4. **Run the frontend server**:
   Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

### Backend Setup (Node.js & Express)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install the dependencies**:
   Run the following command to install all necessary dependencies for the backend:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the `backend` directory and add the following:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/movie-review-system
   ```
   - `MONGO_URI`: Replace with your MongoDB URI if using a cloud database (e.g., MongoDB Atlas).

4. **Start the Backend Server**:
   Run the backend server:
   ```bash
   npm run dev
   ```
   The backend API will be available at `http://localhost:5000`.

### MongoDB Setup

1. **Local MongoDB**:
   - Follow the [official MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/) to install MongoDB locally.
   - Ensure MongoDB is running on `mongodb://localhost:27017`.

2. **MongoDB Atlas (Cloud)**:
   - Alternatively, set up a cloud-based MongoDB instance using [MongoDB Atlas](https://www.mongodb.com/atlas/database).
   - Update the `MONGO_URI` in the backend `.env` file with your Atlas connection string.


## Running the Application

1. Start the MongoDB service (if using local MongoDB).
2. Start the backend server (`npm run dev` in the `backend` directory).
3. Start the frontend server (`npm run dev` in the `frontend` directory).
4. Open `http://localhost:3000` in your browser to access the application.

## Troubleshooting

- Ensure MongoDB is running and the `MONGO_URI` is correct.
- Verify that the `NEXT_PUBLIC_API_URL` in the frontend matches the backend API URL.
- Check that the ports (3000 for frontend, 5000 for backend) are not in use by other applications.

## Notes

- If deploying to production, update the `NEXT_PUBLIC_API_URL` and `MONGO_URI` to point to your deployed backend and database.