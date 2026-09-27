import { StateGraphArgs } from "@langchain/langgraph";
export interface GraphState {
    statistics: Array<Record<string, unknown>> | Record<string, unknown>;
    analysis: string;
    userQuestion: string;
    isQuestionRelevantToStatistics: "plannerService" | "writer";
}
export declare function shouldContinue(state: GraphState): "plannerService" | "writer";
export declare const graphStateChannelsChannels: StateGraphArgs<GraphState>["channels"];
export declare const basicAgentCall: (agentMessage: any, state?: Partial<GraphState>, agentObject?: any, contentPath?: (data: any) => string | Promise<string>, agentProdEndpoint?: string, apiKey?: string) => Promise<any>;
export declare function contextLoader(state: GraphState, config: any): Promise<{
    statistics: Record<string, unknown> | Record<string, unknown>[];
    analysis: string;
    userQuestion: string;
}>;
export declare function checkQuestionNewStatistics(state: GraphState): Promise<{
    isQuestionRelevantToStatistics: string;
}>;
export declare function writer(state: GraphState): Promise<{
    analysis: any;
    isQuestionRelevantToStatistics: "plannerService" | "writer";
    userQuestion: string;
}>;
//# sourceMappingURL=stateManagement.d.ts.map