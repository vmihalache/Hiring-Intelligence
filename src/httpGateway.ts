class HttpGateway {
    constructor() {
    }
    async fetchData(url: string, method: string, requestBody?: {}, headersAdded?: {}, apiKey?: string): Promise<any> {
         console.log("=== FETCHING ===");
         console.log("URL:", url);
         console.log("METHOD:", method);
         console.log("REQUEST BODY:", requestBody);
        const fetchOptions: RequestInit = {
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
         const errorBody = await response.json()
       console.log("Groq error:", errorBody)
        throw new Error(`HTTP error! status: ${response.status}`);
    }
        return response;
    }
}
export const httpGateway = new HttpGateway();