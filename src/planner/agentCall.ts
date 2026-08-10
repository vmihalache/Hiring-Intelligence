import { httpGateway } from "../httpGateway";
import { classifyMessage, questionAndJson } from "./plannerStaticConsts";
require('dotenv').config()

let counter = 0
export const basicAgentCall = async (agentMessage: any, content?: string) => {
    const messages : any[] = [agentMessage, {role: "user", content: content || "" }]
    const qwen2bObject = {
            "model": "qwen/qwen3.6-27b",
            "messages":messages,
            "stream": false,
            "reasoning_format": "hidden"
        }
        let agentResponse = await httpGateway.fetchData(process.env.ProdEndpoint ?? "http://localhost:11434/api/chat", "POST", qwen2bObject);
        console.log("=== Agent Response ===");
        console.log(await agentResponse);
        return agentResponse.json().then(async (data: { choices?: Array<{ message?: { content?: string }, finish_reason?: string }> }) => {
            console.log("=== Agent Response Data ===");
            const finishReason = data.choices?.[0]?.finish_reason;
            if (finishReason == "" && counter == 0) {
                agentResponse = await httpGateway.fetchData(process.env.ProdEndpoint ?? "http://localhost:11434/api/chat", "POST", qwen2bObject);
                counter++;
            }
            if (finishReason !="") {
                return  data.choices?.[0]?.message?.content
            }
               return "customError message: " + finishReason
    })
}
 export const checkResponseMethod = async () => {
 const checkResponse = await basicAgentCall(classifyMessage, JSON.stringify(questionAndJson));   
    console.log("=== Check Response ===");
    console.log(await checkResponse)
    const jsonCheckResponse = JSON.parse(await checkResponse.replace(/```json|```/g, '').trim());
    console.log("=== JSON Check Response ===");
    // console.log(jsonCheckResponse)
    const jsonReturnedByAgent = jsonCheckResponse?.jsonWithStatisticsData ?? jsonCheckResponse;    
    return jsonReturnedByAgent
 }