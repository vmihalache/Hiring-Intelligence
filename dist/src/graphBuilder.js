"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intelligenceGraph = exports.graphBuilder = void 0;
const langgraph_1 = require("@langchain/langgraph");
const stateManagement_1 = require("./stateManagement");
const plannerValidator_1 = require("./planner/plannerValidator");
console.log("CHANNELS:", stateManagement_1.graphStateChannelsChannels);
console.log("CHANNELS TYPE:", typeof stateManagement_1.graphStateChannelsChannels);
console.log("CHANNEL KEYS:", Object.keys(stateManagement_1.graphStateChannelsChannels || {}));
exports.graphBuilder = new langgraph_1.StateGraph({ channels: stateManagement_1.graphStateChannelsChannels }) // Add our nodes to the Graph
    .addNode("contextLoader", stateManagement_1.contextLoader)
    .addNode("writer", stateManagement_1.writer)
    .addNode("plannerService", plannerValidator_1.plannerService)
    .addNode("checkQuestionNewStatistics", stateManagement_1.checkQuestionNewStatistics)
    .addEdge(langgraph_1.START, "contextLoader")
    .addEdge("contextLoader", "checkQuestionNewStatistics")
    .addConditionalEdges('checkQuestionNewStatistics', stateManagement_1.shouldContinue, {
    plannerService: 'plannerService',
    writer: 'writer',
})
    .addEdge("plannerService", "checkQuestionNewStatistics")
    .addEdge("writer", langgraph_1.END);
const checkpointer = new langgraph_1.MemorySaver();
exports.intelligenceGraph = exports.graphBuilder.compile({ checkpointer });
//# sourceMappingURL=graphBuilder.js.map