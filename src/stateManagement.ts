import {END, StateGraph, StateGraphArgs } from "@langchain/langgraph";
import { httpGateway } from "./httpGateway";
import { countryComparison, trend, contradictory, weirdData } from "./mockedResponses/mockedResponses";
import { graphBuilder } from "./graphBuilder";
import { stat } from "node:fs";
import {intelligenceGraph} from "./graphBuilder"; 

require('dotenv').config()

// State type
export interface GraphState {
    statistics: Record<string, unknown>;
    analysis: string;
    userQuestion: string;
    isQuestionRelevantToStatistics: boolean;
}   
interface GroqRequest {

    model:string;
    messages:any[];
    stream:boolean;
    reasoning_format:string;

}
export function shouldContinue(state: GraphState) {
       return state.isQuestionRelevantToStatistics
        ? "planner"
        : "writer";
}


export const graphStateChannelsChannels: StateGraphArgs<GraphState>["channels"] = {
    statistics: {
     value: (currentStatistics, newStatistics) => ({
    ...currentStatistics,
    ...newStatistics
  }),
  default: () => ({}),
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
    reducer: (_, newIsQuestionRelevantToStatistics: boolean) => newIsQuestionRelevantToStatistics,
    default: () => true
}
}

const basicAgentCall = async (agentMessage: any, state?: GraphState, content?: string) => {
    // const messages : any[] = [agentMessage, {role: "user", content: JSON.stringify(state?.statistics) + " " + JSON.stringify(state?.userQuestion)}]; 
       const messages : any[] = [agentMessage, {role: "user", content: content || "" }]

     const qwen2bObject: GroqRequest = {
            "model": "qwen/qwen3.6-27b",
            "messages":messages,
            "stream": false,
            "reasoning_format": "hidden"
        }
        const agentResponse = await httpGateway.fetchData(process.env.ProdEndpoint ?? "http://localhost:11434/api/chat", "POST", qwen2bObject);
        console.log("=== Agent Response ===");
        console.log(agentResponse);
        return agentResponse.json().then((data: { choices?: Array<{ message?: { content?: string } }> }) => {
              return  data.choices?.[0]?.message?.content
                // analysis: data.choices?.[0]?.message?.content ?? "No analysis available.",
                // userQuestion: state?.userQuestion  
    })
}

export function planner(state: GraphState) {
    console.log(`agent response process`);
    console.log(state)
    return state
}
const classifyMessage = {
    role: "system",
    content: `
    - Analyze the user question and push the country names, metrics and years into the .
    `
}
export const plannerService = async () => {
  const jsonWithStatisticsData = {

  "intent": "compare_hiring",
  "countries": [
    "Romania",
    "Germany"
  ],
  "years": [
    2021,
    2022,
    2023,
    2024
  ],
  "metric": "employment_rate",
  "valid": true,
  "reason": ""
}
    const question = "How does the employment rate in Romania compare to Germany from 2021 to 2024?"
    const checkResponse = await basicAgentCall(classifyMessage, undefined, question);
    console.log(checkResponse)
    return checkResponse
}

const writerMessage = {
    role: "system",
    content: `
    - Only analyze the JSON provided.
    - If isQuestionRelevantToStatistics is false use the current analysis and ignore the user question
    - Never invent numbers.
    - Never estimate missing values.
    - If information is missing, explicitly say so.
    - Compare trends before conclusions.
    - Never mention data that isn't present.
    - Answer unrelated questions only with data from the analysis.
    - Dont mention missing data
    - Describe the overall trend naturally before discussing important changes and dont mention all thee intermediary values
    - Never overexplain yourself
`
}
const contextLoaderMessage = {
    role: "system",
    content: `
    Given these statistics and this question,should we reuse them or fetch new ones?
Return only: true or false
`
}

export async function contextLoader(state: GraphState){
    console.log("=== ContextLoader ===");
    console.log(state);
    const history: any[] = [];
   const config = {
  configurable: {
    thread_id: "threadId"
  }
};
    
        let tryThisOut = intelligenceGraph.getStateHistory(config);
        console.log("State history iterator:", tryThisOut);
        for await (const oldState of intelligenceGraph.getStateHistory(config)) {
            history.push({
            checkpointId: oldState.config.configurable?.checkpoint_id,
            values: oldState.values,
            next: oldState.next, // Nodes that are scheduled to run next (if any)
            });
        }
    console.log("History length:", history.length);
    console.log(history.length);
    console.log(history);
    if (history.length > 1) {
        // 1. Get the previous step's data from history
        const pastStatistics = history[1].values.statistics;
        const pastAnalysis = history[1].values.analysis;
        
        // 2. Safely extract your existing array history from state
        // (No need to filter out current metrics because the reducer preserves them!)
        // const existingHistory = Array.isArray(state.statistics?.pastHistoryArray) 
        //     ? state.statistics.pastHistoryArray 
        //     : [];

        // 3. Just return the updated array key
        return {
            statistics: pastStatistics,
            analysis: pastAnalysis
            }

    }
    
    return {};
}
export async function checkQuestionNewStatistics(state: GraphState) {
    console.log("=== CheckQuestionNewStatistics ===");
    console.log(state);

    
    const checkResponse = await basicAgentCall(contextLoaderMessage, state);
    let checkbooleanValue = checkResponse.analysis.trim().toLowerCase();
    let isQuestionRelevanStateValue = checkbooleanValue === "true" ? "planner" : "writer";
    return {
       isQuestionRelevantToStatistics: isQuestionRelevanStateValue
    }
}

export async function writer(state: GraphState) {
    console.log("=== Writer ===");
    console.log(state.statistics);
    console.log(state.analysis);
    const writerResponse = await basicAgentCall(writerMessage, state);     
    return {
        analysis: writerResponse.analysis
    }
}
    


