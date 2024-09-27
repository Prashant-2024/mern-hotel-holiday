import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config"; //load env variables
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

// in case if, env is empty (undefined) we can say it's a string
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

// convert body of api to json format
app.use(express.json());

// helps to parse the url encoded data
app.use(express.urlencoded({ extended: true }));

// allow cross origin requests, like from differenct ports of client-side.
app.use(cors());

// routes for users
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
