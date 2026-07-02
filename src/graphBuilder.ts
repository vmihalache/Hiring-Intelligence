import { StateGraph, START, END, StateGraphArgs } from "@langchain/langgraph";
import { writer,graphStateChannelsChannels } from "./stateManagement";

const graphBuilder = new StateGraph({ channels: graphStateChannelsChannels }) // Add our nodes to the Graph
  
  .addNode("writer", writer)
  .addEdge(START, "writer")
  .addEdge("writer", END);

// Compile the Graph
export const intelligenceGraph = graphBuilder.compile();