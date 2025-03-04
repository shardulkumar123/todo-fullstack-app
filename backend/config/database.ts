import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "../models/userSchema";  // Import User model
import Item from "../models/itemSchema";  // Import Item model

dotenv.config();

// export const sequelize = new Sequelize({
//     database: process.env.POSTGRES_DB || "your_database",
//     username: process.env.POSTGRES_USER || "your_username",
//     password: process.env.POSTGRES_PASSWORD || "your_password",
//     host: process.env.POSTGRES_HOST || "127.0.0.1",
//     dialect: "postgres",
//     logging: false, // Set to `console.log` if you want to log queries
//     models: [User, Item], // Register models here
// });

// export const sequelize = new Sequelize('myDb', 'postgres', '1234', {
//     host: 'localhost',
//     dialect: "postgres",
//     models: [__dirname + '../models'], // Register models here
// });

export const sequelize = new Sequelize({
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",  // Ensure dialect is 'postgres'
    logging: false,
    // logging: console.log,
    models: [User, Item]
});

export const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL connected successfully");

        await sequelize.sync({ alter: true }); // Sync models without dropping tables
    } catch (error) {
        console.error("❌ PostgreSQL connection error:", error);
    }
};
