export const jsonWithStatisticsData = {
  "intent": "compare_hiring",
  "countries": [
  ],
  "years": [
  ],
  "metric": "",
  "valid": true,
  "reason": ""
}
export const classifyMessage = {
    role: "system",
    content: `
    - Analyze the user question and push the country names, metrics and years into the jsonWithStatisticsData json and return it
    - Extract temporal expressions. Do not interpret relative temporal expressions
    `
}
export const questionAndJson = {
        "question": "Compare the unemployment rate in Germany vs Romania two years ago",
        "jsonWithStatisticsData": jsonWithStatisticsData,
    }