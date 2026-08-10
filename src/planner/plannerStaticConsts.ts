export const jsonWithStatisticsData = {
  "intent": "compare_hiring",
  "countries": [
    "Romania",
    "Germany"
  ],
  "years": [
    2021,
    2022,
    2023,
    2024
  ],
  "metric": "employment_rate",
  "valid": true,
  "reason": ""
}
export const classifyMessage = {
    role: "system",
    content: `
    - Analyze the user question and push the country names, metrics and years into the jsonWithStatisticsData json and return it
`
}
export const questionAndJson = {
        "question": "How does the employment rate in Romania compare to Germany and France from 2020 to 2026?",
        "jsonWithStatisticsData": jsonWithStatisticsData,
    }