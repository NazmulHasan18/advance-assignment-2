import express, { Application, Request, Response, Router } from "express";
import cors from "cors";
import { userRouter } from "./modules/user/user.router";

const app: Application = express();

const userRoute: Router = userRouter;

app.use(cors());
app.use(express.json());

app.use("/api", userRoute);

app.get("/", (req: Request, res: Response) => {
   res.send("Hello Bangladesh!");
});

export default app;
