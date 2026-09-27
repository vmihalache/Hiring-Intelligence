import express, { Request, Response } from "express";
import { trend, contradictory } from "./mockedResponses/mockedResponses";

import { intelligenceGraph } from "./graphBuilder";
// Create an Express application
const app = express();
app.use(express.json());
// Specify the port number for the server
const port = Number(process.env.PORT) || 3008;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post("/mockJson", async (req: Request, res: Response) => {
  // Execute the Graph!
  console.log("Received request body:");
  console.log(req.body);
  console.log(Object.keys(req.body));
  let result
  try {
    const incomingThreadId = req.headers["threadid"] || req.headers["thread_id"]; 
    result = await intelligenceGraph.invoke(
      {
    userQuestion: req.body.userQuestion,
  }, 
  {
    configurable: {
        thread_id: incomingThreadId
    }
});
    console.log("\n=====START======");
    console.log("Graph result: ", result);
    console.log("\n=====END======");
  } catch (error) {
    console.error("Error occurred while invoking the graph:", error);
  }
  // res.send("Check the console for the output!");
  res.json(result);
});