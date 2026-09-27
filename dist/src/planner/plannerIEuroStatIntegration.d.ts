import { GraphState } from '../stateManagement';
export declare const plannerServiceWithValidation: (plannerResult: any, state: GraphState) => Promise<{
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
//# sourceMappingURL=plannerIEuroStatIntegration.d.ts.map