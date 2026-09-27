"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAgentCall = exports.graphStateChannelsChannels = void 0;
exports.shouldContinue = shouldContinue;
exports.contextLoader = contextLoader;
exports.checkQuestionNewStatistics = checkQuestionNewStatistics;
exports.writer = writer;
const httpGateway_1 = require("./httpGateway");
const agentData_1 = require("./agentData");
require('dotenv').config();
function shouldContinue(state) {
    console.log("Routing decision value:", state.isQuestionRelevantToStatistics);
    return state.isQuestionRelevantToStatistics;
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
    isQuestionRelevantToStatistics: {
        reducer: (_, newIsQuestionRelevantToStatistics) => newIsQuestionRelevantToStatistics,
        default: () => "plannerService"
    }
};
const userContent = (state) => `
    \`\`\`json
    ${JSON.stringify(state.statistics, null, 2)}
    \`\`\`
User Question: ${state?.userQuestion}
`;
const basicAgentCall = async (agentMessage, state, agentObject, contentPath, agentProdEndpoint, apiKey) => {
    // const messages : any[] = [agentMessage, {role: "user", content: userContent}]; 
    // agentObject["messages"] = [agentMessage, {role: "user", content: userContent}]; 
    //  const qwen2bObject: GroqRequest = {
    //         "model": "qwen/qwen3.6-27b",
    //         "messages":messages,
    //         "stream": false,
    //         "reasoning_format": "hidden",
    //         "max_tokens": 4000
    //     }
    console.log(agentProdEndpoint);
    console.log(agentObject);
    const agentResponse = await httpGateway_1.httpGateway.fetchData(agentProdEndpoint ?? "http://localhost:11434/api/chat", "POST", agentObject, { "x-goog-api-key": apiKey }, apiKey);
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
            // result: content?.choices?.[0]?.message?.content || ""
        };
    });
};
exports.basicAgentCall = basicAgentCall;
// export async function planner(state: GraphState) {
//     console.log("planner is running")
//     return state
// }
const classifyMessage = {
    role: "system",
    content: `
    - Analyze the user question and push the country names, metrics and years into the .
    `
};
// export const plannerService = async () => {
//   const jsonWithStatisticsData = {
//   "intent": "compare_hiring",
//   "countries": [
//     "Romania",
//     "Germany"
//   ],
//   "years": [
//     2021,
//     2022,
//     2023,
//     2024
//   ],
//   "metric": "employment_rate",
//   "valid": true,
//   "reason": ""
// }
//     // const question = "How does the employment rate in Romania compare to Germany from 2021 to 2024?"
//     // const checkResponse = await basicAgentCall(classifyMessage, undefined, question);
//     await basicAgentCall(classifyMessage, state, ollamaObject, ollamaContentPath, process.env.ProdGroqEndpoint);     
//     return checkResponse
// }
async function contextLoader(state, config) {
    console.log("=== ContextLoader ===");
    console.log(state);
    // const history: any[] = [];
    //     for await (const oldState of intelligenceGraph.getStateHistory(config)) {
    //         history.push({
    //         checkpointId: oldState.config.configurable?.checkpoint_id,
    //         values: oldState.values,
    //         next: oldState.next, // Nodes that are scheduled to run next (if any)
    //         });
    //     }
    // console.log("History length:", history.length);
    // console.log(history.length);
    // console.log(history);
    // if (history.length > 1) {
    //     const pastStatistics = history[1].values.statistics;
    //     const pastAnalysis = history[1].values.analysis;
    //     const pastQuestion = history[1].values.userQuestion;
    return {
        statistics: state.statistics || {},
        analysis: state.analysis || "",
        userQuestion: state.userQuestion
    };
}
async function checkQuestionNewStatistics(state) {
    console.log("=== CheckQuestionNewStatistics ===");
    console.log(userContent(state));
    // openrouterObject["messages"] = [contextLoaderMessage, {role: "user", content: userContent(state)}]; 
    const requestPayload = {
        ...agentData_1.openrouterObject,
        messages: [agentData_1.contextLoaderMessage, { role: "user", content: userContent(state) }]
    };
    console.log("requestPayload");
    console.log(requestPayload);
    const checkResponse = await (0, exports.basicAgentCall)(agentData_1.contextLoaderMessage, state, requestPayload, agentData_1.openrouterContentPath, process.env.openRouterEndpoint, process.env.OPENROUTER_API_KEY);
    // const checkResponse = await basicAgentCall(contextLoaderMessage, state, qwen2bObject, ollamaContentPath, process.env.ProdGroqEndpoint, process.env.GROQ_API_KEY);
    let checkbooleanValue = checkResponse.analysis.trim().toLowerCase();
    let isQuestionRelevanStateValue = checkbooleanValue === "false" ? "plannerService" : "writer";
    console.log("what is isQuestionRelevanStateValue");
    console.log(isQuestionRelevanStateValue);
    return {
        isQuestionRelevantToStatistics: isQuestionRelevanStateValue
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
        isQuestionRelevantToStatistics: state.isQuestionRelevantToStatistics,
        userQuestion: state.userQuestion
    };
}
//# sourceMappingURL=stateManagement.js.map