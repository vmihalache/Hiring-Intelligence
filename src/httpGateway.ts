class HttpGateway {
    constructor() {
    }
    async fetchData(url: string, method: string, requestBody?: {}, headersAdded?: {}): Promise<any> {
        const fetchOptions: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
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