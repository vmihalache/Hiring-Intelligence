"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAgentCall = exports.graphStateChannelsChannels = void 0;
exports.shouldContinue = shouldContinue;
exports.contextLoader = contextLoader;
exports.writer = writer;
const httpGateway_1 = require("./httpGateway");
const agentData_1 = require("./agentData");
require('dotenv').config();
function shouldContinue(state) {
    console.log("Routing decision value:", state.decision);
    return state.decision;
}
exports.graphStateChannelsChannels = {
    statistics: {
        value: (currentStatistics, newStatistics) => newStatistics ?? currentStatistics,
        default: () => []
    },
    analysis: {
        reducer: (_, newAnalysis) => newAnalysis,
        default: () => ""
    },
    userQuestion: {
        reducer: (_, newUserQuestion) => newUserQuestion,
        default: () => ""
    },
    isQuestionRelevantToGraph: {
        reducer: (_, newIsQuestionRelevantToGraph) => newIsQuestionRelevantToGraph,
        default: () => false
    },
    decision: {
        reducer: (_, newDecision) => newDecision,
        default: () => "fetch"
    },
    plannerResponse: {
        reducer: (_, newPlannerResponse) => newPlannerResponse,
        default: () => ({})
    }
};
const basicAgentCall = async (agentMessage, state, agentObject, contentPath, agentProdEndpoint, apiKey) => {
    console.log(agentProdEndpoint);
    console.log(agentObject);
    if (!agentProdEndpoint) {
        throw new Error("Missing agentProdEndpoint in basicAgentCall");
    }
    const endpoint = agentProdEndpoint;
    const agentResponse = await httpGateway_1.httpGateway.fetchData(endpoint, "POST", agentObject, { "x-goog-api-key": apiKey }, apiKey);
    console.log(agentResponse);
    return agentResponse.json().then(async (data) => {
        console.log("GEMINI RAW DATA:");
        console.dir(data, { depth: null });
        const content = await contentPath?.(data);
        console.log("GEMINI EXTRACTED CONTENT:", content);
        console.log(data?.choices?.[0].finish_reason);
        // const rawContent = data.choices?.[0]?.message?.content ?? data.message?.content ?? "";
        return {
            analysis: content?.trim() ?? "No analysis available.",
            userQuestion: state?.userQuestion,
            finishReason1: data?.choices?.[0]?.finish_reason
        };
    });
};
exports.basicAgentCall = basicAgentCall;
async function contextLoader(state, config) {
    return {
        statistics: state.statistics || {},
        analysis: state.analysis || "",
        userQuestion: state.userQuestion,
        decision: state.decision
    };
}
async function writer(state) {
    console.log(state.statistics);
    console.log("writer is being run");
    agentData_1.qwen2bObject["messages"] = [agentData_1.writerMessage, { role: "user", content: JSON.stringify(state.statistics) }];
    // qwen2bObject["messages"] = [writerMessage, {role: "user", content: userContent(state)}]; 
    console.log(state);
    console.log(agentData_1.qwen2bObject);
    const writerResponse = await (0, exports.basicAgentCall)(agentData_1.writerMessage, state, agentData_1.qwen2bObject, agentData_1.ollamaContentPath, process.env.ProdGroqEndpoint, process.env.GROQ_API_KEY);
    // console.log(writerResponse)
    return {
        analysis: writerResponse.analysis,
        // isQuestionRelevantToStatistics: state.isQuestionRelevantToStatistics,
        userQuestion: state.userQuestion
    };
}
//# sourceMappingURL=stateManagement.js.map