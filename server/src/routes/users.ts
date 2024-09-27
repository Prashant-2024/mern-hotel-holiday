// convention to use plural for routes in REST API

import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// url -> /api/users/register
router.post(
  "/register",
  [
    // checks for all fields, in case of empty fields it will send error
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    // check if there are any validation errors in the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
      return;
    }

    try {
      // checking if the user email exists in the database
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        // it will send bad request status code with message to the frontend
        res.status(400).json({ message: "User already exists" });
        return;
      }

      user = new User(req.body);
      await user.save();

      // generate token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      // set the token in the cookie
      res.cookie("auth_token", token, {
        // cookie will be accessible by web server only
        httpOnly: true,
        // true/false based on Environment
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, // 24 hours
      });

      res.status(201).json({ message: "User registered successfully" });
      return;
    } catch (error) {
      console.log(error);
      // we will pass a generic msg to maintain error confidentiality from users/hacker
      res.status(500).send({ message: "something went wrong" });
      return;
    }
  }
);

export default router;
