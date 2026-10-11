import { StateGraph } from "@langchain/langgraph";
export declare const graphBuilder: StateGraph<unknown, import("./stateManagement").GraphState, Partial<import("./stateManagement").GraphState>, "__start__" | "writer" | "contextLoader" | "plannerService", import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition, {
    contextLoader: {
        statistics: Record<string, unknown> | Record<string, unknown>[];
        analysis: string;
        userQuestion: string;
        decision: "reuse" | "fetch";
    };
    writer: {
        analysis: any;
        userQuestion: string;
    };
    plannerService: Partial<import("./stateManagement").GraphState>;
}, unknown, unknown>;
export declare const intelligenceGraph: import("@langchain/langgraph").CompiledStateGraph<{
    statistics: Array<Record<string, unknown>> | Record<string, unknown>;
    analysis: string;
    userQuestion: string;
    isQuestionRelevantToGraph: boolean;
    decision: "reuse" | "fetch";
    plannerResponse: {
        countries?: string[];
        years?: (number | string | number[])[];
        metrics?: string[];
        valid?: boolean;
        reason?: string;
    };
}, {
    statistics?: Array<Record<string, unknown>> | Record<string, unknown>;
    analysis?: string;
    userQuestion?: string;
    isQuestionRelevantToGraph?: boolean;
    decision?: "reuse" | "fetch";
    plannerResponse?: {
        countries?: string[];
        years?: (number | string | number[])[];
        metrics?: string[];
        valid?: boolean;
        reason?: string;
    };
}, "__start__" | "writer" | "contextLoader" | "plannerService", import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition, {
    contextLoader: {
        statistics: Record<string, unknown> | Record<string, unknown>[];
        analysis: string;
        userQuestion: string;
        decision: "reuse" | "fetch";
    };
    writer: {
        analysis: any;
        userQuestion: string;
    };
    plannerService: Partial<import("./stateManagement").GraphState>;
}, unknown, unknown, []>;
//# sourceMappingURL=graphBuilder.d.ts.map