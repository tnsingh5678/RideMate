import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url'; // To handle __dirname in ES modules
import mongoose from "./db.js";
import carsRoute from './routes/carsRoute.js'; // Adjusting imports to ES module syntax
import usersRoute from './routes/usersRoute.js';
import bookingsRoute from './routes/bookingsRoute.js';
import cors from "cors"

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// env config
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true,
    allowedHeaders: ['Content-Type']
}));

// Routes
app.use('/api/cars/', carsRoute);
app.use('/api/users/', usersRoute);
app.use('/api/bookings/', bookingsRoute);

// Handling __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Production environment handling
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'));

    app.get('*', (req, res) => {
        res.send('Hello world'); // Adjust the static file path if needed, for example:
        // res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    });
}

// Root route
app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
app.listen(port, () => console.log(`Node JS Server Started on Port ${port}`));
