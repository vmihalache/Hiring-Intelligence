declare class HttpGateway {
    constructor();
    fetchData(url: string, method: string, requestBody?: {}, headersAdded?: {}, apiKey?: string): Promise<any>;
}
export declare const httpGateway: HttpGateway;
export {};
//# sourceMappingURL=httpGateway.d.ts.map