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
    - Correct country names that are misspelled.Do not invent, add, or return countries that do not exist."
    `
}
export const questionAndJson = {
        "question": "Compare the unemployment rate in Frankia, Frances, Fracinsinia, Netherlands, Holland, Deutschland, Deutschusasasfland in 2026?",
        "jsonWithStatisticsData": jsonWithStatisticsData,
    }