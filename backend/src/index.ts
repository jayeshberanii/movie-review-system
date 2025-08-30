import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from './routes/route';
dotenv.config();

// database
import './config/db';

// port
const PORT = process.env.PORT || 5000;

// app
const app = express();

// middleware
app.use(express.json());
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type']
}));

// routes
app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});