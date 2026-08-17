import { httpGateway } from "../httpGateway";
import { classifyMessage, questionAndJson } from "./plannerStaticConsts";
require('dotenv').config()

let counter = 0
export const basicAgentCall = async (agentMessage: any, content?: string) => {
    const messages : any[] = [agentMessage, {role: "user", content: content }]
    const qwen2bObject = {
            "model": "qwen/qwen3.6-27b",
            "messages":messages,
            "stream": false,
            "reasoning_format": "hidden"
        }
    const getAgentResponse = async () => {
        const agentResponse = await httpGateway.fetchData(process.env.ProdEndpoint ?? "http://localhost:11434/api/chat", "POST", qwen2bObject);
        console.log("=== Agent Response ===");
        // const responseText = await agentResponse.text();
        // console.log(responseText);
        return agentResponse.json().then(async (data: { choices?: Array<{ message?: { content?: string }, finish_reason?: string }> }) => {
            console.log("=== Agent Response Data ===");
            console.log(data);
        let finishReason1 = data.choices?.[0]?.finish_reason;
        let result: string = data.choices?.[0]?.message?.content || "";
        console.log("=== Agent Response ===");
        console.log("Finish Reason: ", finishReason1);
        console.log("Result: ", result);
        if (result != "") {
        return { finishReason: finishReason1, result: result }
        }
        if (result == "" && counter < 2) {
             console.log("Agent response is empty. Retrying... Attempt:", counter + 1);
             counter++;
            return await getAgentResponse();
        }
        else {
            throw new Error("Agent response is empty after multiple attempts.");
        }
    })}
    return getAgentResponse();
}

 export const checkResponseMethod = async () => {
 const checkResponse = await basicAgentCall(classifyMessage, JSON.stringify(questionAndJson)); 
 console.log("=== Check Response ===");
 console.log(checkResponse)  

 let responseText = typeof checkResponse === "string" ? checkResponse : JSON.stringify(checkResponse)
 let jso = JSON.parse(responseText.replace(/```json|```/g, '').trim()).result
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