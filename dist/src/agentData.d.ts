interface GroqRequest {
    model: string;
    messages?: any[];
    stream: boolean;
    reasoning_format: string;
    max_tokens: number;
}
interface GeminiRequest {
    model: string;
    messages?: any[];
    stream: false;
    max_completion_tokens: number;
    "x-goog-api-key"?: string;
}
interface openrouterRequest {
    model: string;
    messages?: any[];
    stream: false;
    max_completion_tokens: number;
    tools?: any[];
    "x-openrouter-api-key"?: string;
}
export declare const qwen2bObject: GroqRequest;
export declare const geminiObject: GeminiRequest;
export declare const openrouterObject: openrouterRequest;
export declare const ollamaContentPath: (data: any) => Promise<any>;
export declare const geminiContentPath: (data: any) => Promise<any>;
export declare const openrouterContentPath: (data: any) => Promise<any>;
export declare const writerMessage: {
    role: string;
    content: string;
};
export declare const contextLoaderMessage: {
    role: string;
    content: string;
};
export {};
//# sourceMappingURL=agentData.d.ts.map