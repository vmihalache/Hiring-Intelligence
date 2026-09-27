import { StateGraph } from "@langchain/langgraph";
export declare const graphBuilder: StateGraph<unknown, import("./stateManagement").GraphState, Partial<import("./stateManagement").GraphState>, "plannerService" | "writer" | "__start__" | "contextLoader" | "checkQuestionNewStatistics", import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition, {
    contextLoader: {
        statistics: Record<string, unknown> | Record<string, unknown>[];
        analysis: string;
        userQuestion: string;
    };
    writer: {
        analysis: any;
        isQuestionRelevantToStatistics: "plannerService" | "writer";
        userQuestion: string;
    };
    plannerService: {
        statistics: {
            [country: string]: string | {
                [labelorYears: string]: number;
            };
            intent?: string;
            description?: string;
            time?: string;
        }[];
        userQuestion: string;
    };
    checkQuestionNewStatistics: Partial<import("./stateManagement").GraphState>;
}, unknown, unknown>;
export declare const intelligenceGraph: import("@langchain/langgraph").CompiledStateGraph<{
    statistics: Array<Record<string, unknown>> | Record<string, unknown>;
    analysis: string;
    userQuestion: string;
    isQuestionRelevantToStatistics: "plannerService" | "writer";
}, {
    statistics?: Array<Record<string, unknown>> | Record<string, unknown>;
    analysis?: string;
    userQuestion?: string;
    isQuestionRelevantToStatistics?: "plannerService" | "writer";
}, "plannerService" | "writer" | "__start__" | "contextLoader" | "checkQuestionNewStatistics", import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition, import("@langchain/langgraph").StateDefinition, {
    contextLoader: {
        statistics: Record<string, unknown> | Record<string, unknown>[];
        analysis: string;
        userQuestion: string;
    };
    writer: {
        analysis: any;
        isQuestionRelevantToStatistics: "plannerService" | "writer";
        userQuestion: string;
    };
    plannerService: {
        statistics: {
            [country: string]: string | {
                [labelorYears: string]: number;
            };
            intent?: string;
            description?: string;
            time?: string;
        }[];
        userQuestion: string;
    };
    checkQuestionNewStatistics: Partial<import("./stateManagement").GraphState>;
}, unknown, unknown, []>;
//# sourceMappingURL=graphBuilder.d.ts.map