import express, { Application } from "express";
import { errorHandler } from "./middlewares";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

// Application init.
const app: Application = express();

// Middlewares.
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Init Routes.
// app.use('/api/auth', authRoutes);
// app.use('/api', clientRoutes);


app.use((req, res) => {
    if (req.path == '/') return res.json({ msg: 'Welcome to www.leadsmanagement.com' });

    res.send(`
    <h2>No Information Foud For This Route.</h2>
    <a href="http:localhost:4000">Home Route</a>
    `)
})

// Error Handler.
app.use(errorHandler);

app.listen(4000, () => console.log(`listening on http://localhost:${4000}`));