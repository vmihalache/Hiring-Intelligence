import {END, StateGraph, StateGraphArgs } from "@langchain/langgraph";
import { httpGateway } from "./httpGateway";
import { countryComparison, trend, contradictory, weirdData } from "./mockedResponses/mockedResponses";
import { graphBuilder } from "./graphBuilder";
import { stat } from "node:fs";
import {intelligenceGraph} from "./graphBuilder"; 
import { v4 as uuidv4 } from "uuid";
import {qwen2bObject, geminiObject, ollamaContentPath, geminiContentPath, openrouterObject, openrouterContentPath, contextLoaderMessage, writerMessage} from "./agentData"
require('dotenv').config()

export interface GraphState {
    statistics: Array<Record<string, unknown>> | Record<string, unknown>;
    analysis: string;
    userQuestion: string;
    isQuestionRelevantToStatistics: "plannerService" | "writer"
}   

export function shouldContinue(state: GraphState) {
    console.log("Routing decision value:", state.isQuestionRelevantToStatistics);
    return state.isQuestionRelevantToStatistics;
}


export const graphStateChannelsChannels: StateGraphArgs<GraphState>["channels"] = {
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
    reducer: (_, newIsQuestionRelevantToStatistics: "plannerService" | "writer") => newIsQuestionRelevantToStatistics,
    default: () => "plannerService"
}
}

 const userContent = (state: any) =>`
    \`\`\`json
    ${JSON.stringify(state.statistics, null, 2)}
    \`\`\`
User Question: ${state?.userQuestion}
`
 

export const basicAgentCall = async (agentMessage: any, state?: Partial<GraphState>, agentObject?: any, contentPath?: (data: any) => string | Promise<string>, agentProdEndpoint?: string, apiKey?: string) => {
   

    // const messages : any[] = [agentMessage, {role: "user", content: userContent}]; 
        // agentObject["messages"] = [agentMessage, {role: "user", content: userContent}]; 

    //  const qwen2bObject: GroqRequest = {
    //         "model": "qwen/qwen3.6-27b",
    //         "messages":messages,
    //         "stream": false,
    //         "reasoning_format": "hidden",
    //         "max_tokens": 4000
    //     }
    console.log(agentProdEndpoint)
    console.log(agentObject)

    if (!agentProdEndpoint) {
        throw new Error("Missing agentProdEndpoint in basicAgentCall");
    }

    const endpoint = agentProdEndpoint;
    const agentResponse = await httpGateway.fetchData(
      endpoint,
      "POST",
      agentObject,
      { "x-goog-api-key": apiKey },
      apiKey
    );
        console.log(agentResponse)
        return agentResponse.json().then(async (data: any) => {
            console.log("GEMINI RAW DATA:");
            console.dir(data, { depth: null });
            const content = await contentPath?.(data);
            console.log("GEMINI EXTRACTED CONTENT:", content);
            console.log(data?.choices?.[0].finish_reason)

            // const rawContent = data.choices?.[0]?.message?.content ?? data.message?.content ?? "";
            return {
                analysis: content?.trim() ?? "No analysis available.",
                userQuestion: state?.userQuestion,  
                finishReason1: data?.choices?.[0]?.finish_reason
                // result: content?.choices?.[0]?.message?.content || ""
    }
})
}

// export async function planner(state: GraphState) {
//     console.log("planner is running")
//     return state
// }
const classifyMessage = {
    role: "system",
    content: `
    - Analyze the user question and push the country names, metrics and years into the .
    `
}
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



export async function contextLoader(state: GraphState, config: any){
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
export async function checkQuestionNewStatistics(state: GraphState) {
    console.log("=== CheckQuestionNewStatistics ===");
    console.log(userContent(state))
    // openrouterObject["messages"] = [contextLoaderMessage, {role: "user", content: userContent(state)}]; 
    const requestPayload = {
        ...openrouterObject,
        messages: [contextLoaderMessage, { role: "user", content: userContent(state) }]
    };  
    console.log("requestPayload")
    console.log(requestPayload)
    const checkResponse = await basicAgentCall(contextLoaderMessage, state, requestPayload, openrouterContentPath,process.env.openRouterEndpoint, process.env.OPENROUTER_API_KEY);
    // const checkResponse = await basicAgentCall(contextLoaderMessage, state, qwen2bObject, ollamaContentPath, process.env.ProdGroqEndpoint, process.env.GROQ_API_KEY);
    let checkbooleanValue = checkResponse.analysis.trim().toLowerCase();
    let isQuestionRelevanStateValue = checkbooleanValue === "false" ? "plannerService" : "writer";
    console.log("what is isQuestionRelevanStateValue")
    console.log(isQuestionRelevanStateValue)
    return {
       isQuestionRelevantToStatistics: isQuestionRelevanStateValue
    }
}

export async function writer(state: GraphState) {
    console.log(state.statistics)
    console.log("writer is being run")
    qwen2bObject["messages"] = [writerMessage, {role: "user", content: JSON.stringify(state.statistics)}];
    // qwen2bObject["messages"] = [writerMessage, {role: "user", content: userContent(state)}]; 
    console.log(state)
    console.log(qwen2bObject)
    const writerResponse = await basicAgentCall(writerMessage, state, qwen2bObject, ollamaContentPath, process.env.ProdGroqEndpoint, process.env.GROQ_API_KEY);    
    // console.log(writerResponse)
    return {
        analysis: writerResponse.analysis,
        isQuestionRelevantToStatistics: state.isQuestionRelevantToStatistics,
        userQuestion: state.userQuestion
    }
}
    



