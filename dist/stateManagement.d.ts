import { StateGraphArgs } from "@langchain/langgraph";
export interface GraphState {
    statistics: Array<Record<string, unknown>> | Record<string, unknown>;
    analysis: string;
    userQuestion: string;
    isQuestionRelevantToGraph: boolean;
    decision: "reuse" | "fetch" | "invalid";
    error?: string;
    plannerResponse: {
        countries?: string[];
        years?: (number | string | number[])[];
        metrics?: string[];
        reason?: string;
        valid?: boolean;
    };
}
export declare function shouldContinue(state: GraphState): "reuse" | "fetch" | "invalid";
export declare const graphStateChannelsChannels: StateGraphArgs<GraphState>["channels"];
export declare const basicAgentCall: (agentMessage: any, state?: Partial<GraphState>, agentObject?: any, contentPath?: (data: any) => string | Promise<string>, agentProdEndpoint?: string, apiKey?: string) => Promise<any>;
export declare function contextLoader(state: GraphState, config: any): Promise<{
    statistics: Record<string, unknown> | Record<string, unknown>[];
    analysis: string;
    userQuestion: string;
    decision: "reuse" | "fetch" | "invalid";
}>;
export declare function writer(state: GraphState): Promise<{
    analysis: any;
    userQuestion: string;
}>;
//# sourceMappingURL=stateManagement.d.ts.map