import { StateGraph, START, END, StateGraphArgs, MemorySaver } from "@langchain/langgraph";
import { writer, contextLoader, graphStateChannelsChannels, planner,checkQuestionNewStatistics, shouldContinue } from "./stateManagement";

export const graphBuilder = new StateGraph({ channels: graphStateChannelsChannels }) // Add our nodes to the Graph
  
  .addNode("contextLoader", contextLoader)
  .addNode("writer", writer)
  .addNode("planner", planner)
  .addNode("checkQuestionNewStatistics", checkQuestionNewStatistics)
  .addEdge(START, "contextLoader")
  .addEdge("contextLoader", "checkQuestionNewStatistics")
  .addEdge("planner", "writer")
  .addEdge("writer", END)
  .addConditionalEdges('checkQuestionNewStatistics', shouldContinue, {
    planner: 'planner',
    writer: 'writer',
  })
 const checkpointer = new MemorySaver(); 
export const intelligenceGraph = graphBuilder.compile( {checkpointer});


