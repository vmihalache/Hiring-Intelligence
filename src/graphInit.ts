 import express, { Request, Response } from "express";

import { intelligenceGraph } from "./graphBuilder";

// Create an Express application
const app = express();

// Specify the port number for the server
const port: number = 3008;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/mockJson", async (req: Request, res: Response) => {
  // Execute the Graph!
  try {
    const result = await intelligenceGraph.invoke({});
    console.log("\n=====START======");
    console.log("Graph result: ", result);
    console.log("\n=====END======");
  } catch (error) {
    console.error("Error occurred while invoking the graph:", error);
  }
  res.send("Check the console for the output!");
});