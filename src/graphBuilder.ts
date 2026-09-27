import { StateGraph, START, END, StateGraphArgs, MemorySaver } from "@langchain/langgraph";
import { writer, contextLoader, graphStateChannelsChannels,checkQuestionNewStatistics, shouldContinue } from "./stateManagement";
import {plannerService} from './planner/plannerValidator'

console.log("CHANNELS:", graphStateChannelsChannels);
console.log("CHANNELS TYPE:", typeof graphStateChannelsChannels);
console.log("CHANNEL KEYS:", Object.keys(graphStateChannelsChannels || {}));
export const graphBuilder = new StateGraph({ channels: graphStateChannelsChannels }) // Add our nodes to the Graph
  
  .addNode("contextLoader", contextLoader)
  .addNode("writer", writer)
  .addNode("plannerService", plannerService)
  .addNode("checkQuestionNewStatistics", checkQuestionNewStatistics)
  .addEdge(START, "contextLoader")
  .addEdge("contextLoader", "checkQuestionNewStatistics")
  .addConditionalEdges('checkQuestionNewStatistics', shouldContinue, {
    plannerService: 'plannerService',
    writer: 'writer',
  })
  .addEdge("plannerService", "checkQuestionNewStatistics")
  .addEdge("writer", END)
 const checkpointer = new MemorySaver(); 
export const intelligenceGraph = graphBuilder.compile( {checkpointer});


