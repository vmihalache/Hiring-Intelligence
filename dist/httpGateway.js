"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGateway = void 0;
class HttpGateway {
    constructor() {
    }
    async fetchData(url, method, requestBody, headersAdded, apiKey) {
        console.log("=== FETCHING ===");
        console.log("URL:", url);
        console.log("METHOD:", method);
        console.log("REQUEST BODY:", requestBody);
        const fetchOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                ...headersAdded
            }
        };
        if (requestBody) {
            fetchOptions.body = JSON.stringify(requestBody);
        }
        const response = await fetch(url, fetchOptions);
        // console.log("HTTP response status:", response.json())
        if (!response.ok) {
            const errorBody = await response.json();
            console.log("Groq error:", errorBody);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    }
}
exports.httpGateway = new HttpGateway();
//# sourceMappingURL=httpGateway.js.map