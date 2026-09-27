import type { GraphState } from '../stateManagement';
export declare const plannerService: (state: GraphState) => Promise<{
    statistics: {
        [country: string]: string | {
            [labelorYears: string]: number;
        };
        intent?: string;
        description?: string;
        time?: string;
    }[];
    userQuestion: string;
}>;
//# sourceMappingURL=plannerValidator.d.ts.map