import express, { Application } from "express";
import { errorHandler } from "./middlewares";
import cookieParser from "cookie-parser";
import { authRouter, customerRouter, utilityRouter } from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

// Application init.
const app: Application = express();

// Middlewares.
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Init Routes.
app.use('/api/auth', authRouter);
app.use('/api', customerRouter);
app.use('/api', utilityRouter);

app.use(async (req, res) => {
    if (req.path == '/') return res.json({ msg: 'Welcome to leads management system' });

    res.send(`
    <h2>No Information Found For This Route.</h2>
    <a href="http:localhost:4000">Home Route</a>
    `)
})

// Error Handler.
app.use(errorHandler);

app.listen(4000, () => console.log(`listening on http://localhost:${4000}`));