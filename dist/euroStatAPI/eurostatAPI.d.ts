export declare class EuroStatAPI {
    requestParameters: any[];
    dataset?: string;
    constructor(requestParameters: any[], dataset: string);
    euroStatApiResponse: () => Promise<{
        [country: string]: string | {
            [labelorYears: string]: number;
        };
        intent?: string;
        description?: string;
        time?: string;
    }>;
}
//# sourceMappingURL=eurostatAPI.d.ts.map