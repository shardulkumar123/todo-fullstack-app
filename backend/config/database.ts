import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "../models/userSchema";
import Item from "../models/itemSchema";

dotenv.config();

export const sequelize = new Sequelize({
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",  // Ensure dialect is 'postgres'
    logging: false,
    models: [User, Item]
});

export const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected successfully");

        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error("PostgreSQL connection error:", error);
    }
};
