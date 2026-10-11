import { classifyMessage, questionAndJson } from "./plannerStaticConsts";
import {geminiContentPath, geminiObject, openrouterContentPath, openrouterObject} from "../agentData"
import {basicAgentCall} from '../stateManagement'
import type { GraphState } from '../stateManagement';
require('dotenv').config()

    let counter = 0
    const agentRunner = async (agentMessage: any, state?: GraphState) => {  
       
geminiObject["messages"] = [
    agentMessage,
    {
        role: "user",
        content: JSON.stringify({
            userQuestion: state?.userQuestion,
            statistics: state?.statistics
        })
    }
];

const getAgentResponse = async () => {
        const data = await basicAgentCall(agentMessage, state, geminiObject, geminiContentPath, process.env.ProdGeminiEndpoint, process.env.GEMINI_API_KEY); 
        console.log("=== Agent Response ===");
        console.log(state)
        // const responseText = await agentResponse.text();
        console.log("Agent Response: ", data);
        // const data: { choices?: Array<{ message?: { content?: string }, finish_reason?: string }> } = JSON.parse(JSON.stringify(agentResponse.analysis));
        // return agentResponse.analysis.then(async (data: { choices?: Array<{ message?: { content?: string }, finish_reason?: string }> }) => {
            console.log("=== Agent Response Data ===");
            console.log(data.finishReason1);
    
        let finishReason1 = data.finishReason1
        let result: string = data.analysis || "";
        console.log("=== Agent Response ===");
        console.log("Finish Reason: ", finishReason1);
        console.log("Result: ", result);
        if (result != "") {
        
        return { finishReason: finishReason1, result: result, analysis: data.analysis };
        }
        if (result == "" && counter < 2) {
             console.log("Agent response is empty. Retrying... Attempt:", counter + 1);
             counter++;
            return await getAgentResponse();
        }
        else {
            throw new Error("Agent response is empty after multiple attempts.");
        }
    }
    return getAgentResponse();
}

 export const checkResponseMethod = async (state: GraphState) => {
 
 const checkResponse = await agentRunner(classifyMessage, state);
 console.log("=== Check Response ===");
 console.log(checkResponse)  

 let responseText = typeof checkResponse === "string" ? checkResponse : JSON.stringify(checkResponse)
 let jso = JSON.parse(responseText.replace(/```json|```/g, '').trim()).result
 console.log("=== JSON Check Response2 ===");
 console.log(JSON.parse(responseText.replace(/```json|```/g, '').trim()))
 if (JSON.parse(jso).reuseFetch === "reuse") {
    state.decision = "reuse"
 }
 else {
    state.decision = "fetch"
 }
 console.log("=== Decision ===");
 console.log(state.decision)
 console.log(jso.reuseFetch)
// let jso = JSON.parse(responseText).trim().result
 try {
    JSON.parse(jso)
    } catch (error) {
        console.error("Error parsing JSON:", error);
        console.error("Response content:", checkResponse);
        throw error; // Rethrow the error after logging
    }  

  if (jso) {
    console.log("=== JSON Check Response ===");
    console.log(jso)
    console.log(JSON.parse(jso))
    return JSON.parse(jso).jsonWithStatisticsData ?? JSON.parse(jso)
 }
}