import Express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js"; // Ensure the correct path to swaggerConfig.js

const app = Express();
app.use(bodyParser.json());
app.use(cors());

// Swagger Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// In-memory storage for posts
const posts = {};

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     description: Fetch all posts stored in memory.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get("/posts", (req, res) => {
    res.send(posts);
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Add a new post to the memory store.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first post"
 *     responses:
 *       201:
 *         description: The created post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    posts[id] = { id, title };

    // Simulate event broadcast
    await axios.post("http://localhost:4005/Events", {
        type: "PostCreated",
        data: { id, title },
    });

    res.status(201).send(posts[id]);
});

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Handle incoming events
 *     description: Endpoint to handle events sent by the event bus.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "PostCreated"
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Event processed successfully.
 */
app.post("/events", (req, res) => {
    console.log("Event received:", req.body.type);
    res.send({});
});

// Start the server
app.listen(4000, () => {
    console.log("Posts server started on port 4000");
});
