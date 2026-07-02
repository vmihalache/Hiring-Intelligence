import {StateGraphArgs } from "@langchain/langgraph";
import { httpGateway } from "./httpGateway";
import { countryComparison } from "./mockedResponses/mockedResponses";
require('dotenv').config()


// State type
export interface GraphState {
    statistics: Record<string, unknown>;
    analysis: string;
    userQuestion: string;
}   
interface GroqRequest {

    model:string;

    messages:any[];

    stream:boolean;

}


export const graphStateChannelsChannels: StateGraphArgs<GraphState>["channels"] = {
    statistics: {
    value: (_, newStatistics) => newStatistics,
    default: () => ({})
},
    analysis: {
    value: (_, newAnalysis) => newAnalysis
},
    userQuestion: {
    value: (_, newUserQuestion) => newUserQuestion
}   
};
console.log(process.env.ProdEndpoint);
const getExecutionPlan = async (qwen2bObject: GroqRequest) => {
        const agentResponse = await httpGateway.fetchData(process.env.ProdEndpoint ?? "http://localhost:11434/api/chat", "POST", qwen2bObject);
        return agentResponse.json().then((data: { choices: []; message?: { tool_calls?: any; content?: string; role?: string } }) => {
            return data;
        });
    }

export function planner(state: GraphState) {
    console.log(`agent response process`);
    return {};
}
const systemMessage = {
    role: "system",
    content: `
You are a labour market analyst.

Rules:

- Only analyze the JSON provided.
- Never invent numbers.
- Never estimate missing values.
- If information is missing, explicitly say so.
- Compare trends before conclusions.
- Never mention data that isn't present.
- Never answer unrelated questions.
- Maximum 150 words.
`
}
export async function writer(state: GraphState) {
    
    const messages : any[] = [systemMessage, {role: "user", content: JSON.stringify(countryComparison)}]; 
                   
    const qwen2bObject = {
            "model": "qwen/qwen3-32b",
            "messages":messages,
            "stream": false,
        }
    const response = await getExecutionPlan(qwen2bObject);
    console.log("Raw response: ", response);
    // const filteredResponse = response.then((data: { choices: []; message?: { tool_calls?: any; content?: string; role?: string } }) => {
    //         return data 
    // });
    // console.log("Filtered response: ", filteredResponse);

    return {
        analysis: response.choices[0]?.message?.content ?? "No analysis available."
    }
}
    


