interface GroqRequest {
    model:string;
    messages?: any[]
    stream:boolean;
    reasoning_format:string;
    max_tokens: number;
}
interface GeminiRequest {
    model: string,
    messages?: any[]
    stream: false,
    max_completion_tokens: number, 
    "x-goog-api-key"?: string
}
interface openrouterRequest {
    model: string,
    messages?: any[]
    stream: false,
    max_completion_tokens: number,
    tools?: any[]
    "x-openrouter-api-key"?: string
}
  export const qwen2bObject: GroqRequest = {
            "model": "qwen/qwen3.8-27b",
            "stream": false,
            "reasoning_format": "hidden",
            "max_tokens": 2500
        }
  export const geminiObject: GeminiRequest = {  
           "model": "gemini-3.5-flash-lite",
           "stream": false,
           "max_completion_tokens": 1000 // OpenAI standard 
  }
  export const openrouterObject: openrouterRequest = {
    "model": "openrouter/free",
    "tools": [],
    "stream": false,
    "max_completion_tokens": 2000,
  }
  export const ollamaContentPath =  async (data: any) => {
    return data.choices?.[0]?.message?.content ?? data.message?.content ?? "";
  }
  export const geminiContentPath = async (data: any) => {
    
    return  data.choices?.[0]?.message?.content ?? "";
  }
  export const openrouterContentPath = async (data: any) => {
    return  data.choices?.[0]?.message?.content ?? "";
  }
  export const writerMessage = {
    role: "system",
    content: `
- You are a data analyst.
- The user's question is authoritative. Do not reinterpret it.

- CRITICAL REGEX/EXACT MATCH RULE:
  Sentence 1 of Paragraph 1 MUST start with:
  "Regarding the [EXACT USER QUESTION METRIC] in [YEAR] in [COUNTRY 1] vs [COUNTRY 2],"
  For example: "Regarding the dev employment rate in 2025 in Romania vs Germany,"

- DATA MATCHING PRIORITY:
  When matching terms like 'dev', 'developer', or 'IT', select metrics in this exact priority order:
  1. "Software and applications developers and analysts"
  2. "Information and communications technology (ICT) specialists" / "ICT professionals"
  NEVER use unrelated metrics (such as "older workers" or "NEET rates") as the primary metric for a 'dev' question.

- OUTPUT CONSTRAINTS:
  1. ZERO meta-commentary, zero negative reasoning, zero explanations of how data was matched.
  2. Do not report source data flaws or dataset anomalies to the user (e.g., do not write "(Note: structure is inverted...)").
  3. Clean text only: ensure special characters like apostrophes render cleanly without encoding bugs (e.g., write "Romania's", never "RomaniaÔÇÖs").

- STRUCTURE:
  - Paragraph 1: Sentence 1 restatement + primary matching metrics.
  - Paragraph 2 MUST start with the exact title on its own line: "extra data related to the question" followed by supporting metrics.
`
}
export const contextLoaderMessage = {
    role: "system",
    content: `
    Given these statistics and this question,should we reuse them or fetch new ones?
Return only: true or false
`
}