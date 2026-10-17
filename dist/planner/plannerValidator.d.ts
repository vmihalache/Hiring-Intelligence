import type { GraphState } from '../stateManagement';
export declare const plannerService: (state: GraphState) => Promise<{
    statistics: {
        [country: string]: string | {
            [labelorYears: string]: number;
        };
        intent?: string;
        description?: string;
        time?: string;
    }[][];
    userQuestion: string;
    decision: "reuse";
    analysis: string;
    plannerResponse: {
        countries?: string[];
        years?: (number | string | number[])[];
        metrics?: string[];
        reason?: string;
        valid?: boolean;
    };
} | {
    statistics: Record<string, unknown> | Record<string, unknown>[];
    analysis: string;
    userQuestion: string;
    decision: "reuse" | "invalid";
    plannerResponse?: never;
} | {
    userQuestion: string;
    statistics: Record<string, unknown> | Record<string, unknown>[];
    decision: "invalid";
    analysis: string;
    plannerResponse: {
        countries?: string[];
        years?: (number | string | number[])[];
        metrics?: string[];
        reason?: string;
        valid?: boolean;
    };
}>;
//# sourceMappingURL=plannerValidator.d.ts.map