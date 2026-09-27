"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResponseMethod = void 0;
const plannerStaticConsts_1 = require("./plannerStaticConsts");
const agentData_1 = require("../agentData");
const stateManagement_1 = require("../stateManagement");
require('dotenv').config();
let counter = 0;
const agentRunner = async (agentMessage, content, state) => {
    agentData_1.geminiObject["messages"] = [agentMessage, { role: "user", content: content }];
    const getAgentResponse = async () => {
        const data = await (0, stateManagement_1.basicAgentCall)(agentMessage, state, agentData_1.geminiObject, agentData_1.geminiContentPath, process.env.ProdGeminiEndpoint, process.env.GEMINI_API_KEY);
        console.log("=== Agent Response ===");
        // const responseText = await agentResponse.text();
        console.log("Agent Response: ", data);
        // const data: { choices?: Array<{ message?: { content?: string }, finish_reason?: string }> } = JSON.parse(JSON.stringify(agentResponse.analysis));
        // return agentResponse.analysis.then(async (data: { choices?: Array<{ message?: { content?: string }, finish_reason?: string }> }) => {
        console.log("=== Agent Response Data ===");
        console.log(data.finishReason1);
        let finishReason1 = data.finishReason1;
        let result = data.analysis || "";
        console.log("=== Agent Response ===");
        console.log("Finish Reason: ", finishReason1);
        console.log("Result: ", result);
        if (result != "") {
            return { finishReason: finishReason1, result: result };
        }
        if (result == "" && counter < 2) {
            console.log("Agent response is empty. Retrying... Attempt:", counter + 1);
            counter++;
            return await getAgentResponse();
        }
        else {
            throw new Error("Agent response is empty after multiple attempts.");
        }
    };
    return getAgentResponse();
};
const checkResponseMethod = async (state) => {
    const checkResponse = await agentRunner(plannerStaticConsts_1.classifyMessage, JSON.stringify({ "userQuestion": state.userQuestion }), state);
    console.log("=== Check Response ===");
    console.log(checkResponse);
    let responseText = typeof checkResponse === "string" ? checkResponse : JSON.stringify(checkResponse);
    let jso = JSON.parse(responseText.replace(/```json|```/g, '').trim()).result;
    // let jso = JSON.parse(responseText).trim().result
    try {
        JSON.parse(jso);
    }
    catch (error) {
        console.error("Error parsing JSON:", error);
        console.error("Response content:", checkResponse);
        throw error; // Rethrow the error after logging
    }
    if (jso) {
        console.log("=== JSON Check Response ===");
        console.log(jso);
        console.log(JSON.parse(jso));
        return JSON.parse(jso).jsonWithStatisticsData ?? JSON.parse(jso);
    }
};
exports.checkResponseMethod = checkResponseMethod;
//# sourceMappingURL=agentCall.js.map