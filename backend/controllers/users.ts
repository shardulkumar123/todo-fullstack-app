import { Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchemaValidation, userSchemaValidation } from "../validations/user";

const Users = {
  createUser: async (req: Request, res: Response): Promise<any> => {
    try {
      const { error } = userSchemaValidation.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.details.map(err => err.message),
        });
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists." });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      } as any);

      res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  },

  loginUser: async (req: Request, res: Response): Promise<any> => {
    try {
      // Validate request body
      const { error } = loginSchemaValidation.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.details.map(err => err.message),
        });
      }

      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "3d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  },
};

export default Users;
