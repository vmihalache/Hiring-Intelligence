import {END, StateGraph, StateGraphArgs } from "@langchain/langgraph";
import { httpGateway } from "./httpGateway";
import {qwen2bObject, geminiObject, ollamaContentPath, geminiContentPath, openrouterObject, openrouterContentPath, contextLoaderMessage, writerMessage} from "./agentData"
require('dotenv').config()

export interface GraphState {
    statistics: Array<Record<string, unknown>> | Record<string, unknown>;
    analysis: string;
    userQuestion: string;
    // isQuestionRelevantToStatistics: "plannerService" | "writer"
    isQuestionRelevantToGraph: boolean
    decision: "reuse" | "fetch"  | "invalid",
    error?: string;
    plannerResponse: {
    countries?: string[];
    years?: (number | string | number[])[];
    metrics?: string[];
    reason?: string;
    valid?: boolean;
    }
}   

export function shouldContinue(state: GraphState) {
    console.log("Routing decision value:", state.decision);
    return state.decision 
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
   isQuestionRelevantToGraph: {
    reducer: (_, newIsQuestionRelevantToGraph: boolean) => newIsQuestionRelevantToGraph,
    default: () => false
},
decision: {
    reducer: (_, newDecision: "reuse" | "fetch") => newDecision,
    default: () => "fetch"
},
plannerResponse: {
    reducer: (_, newPlannerResponse: any) => newPlannerResponse,
    default: () => ({})
},
error: {
    reducer: (_, newError: string) => newError,
    default: () => ""   
}
}
export const basicAgentCall = async (agentMessage: any, state?: Partial<GraphState>, agentObject?: any, contentPath?: (data: any) => string | Promise<string>, agentProdEndpoint?: string, apiKey?: string) => {
   
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
    }
})
}

export async function contextLoader(state: GraphState, config: any){

       return {
    statistics: state.statistics || {},
    analysis: state.analysis || "",
    userQuestion: state.userQuestion,
    decision: state.decision 
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
    if (state.decision === "invalid") {
       throw state.plannerResponse.reason || "Invalid planner response";
    }
    return {
        analysis: writerResponse.analysis,
        // isQuestionRelevantToStatistics: state.isQuestionRelevantToStatistics,
        userQuestion: state.userQuestion
    }
}
    



