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
    - Given the existing statistics and this question,should we reuse them or fetch new ones?
    - If we are reusing set reuseFetch to "reuse". Else set reuseFetch to "fetch"
    - Analyze the user question and push the country names, metrics and years into the jsonWithStatisticsData json and return it
    - Extract temporal expressions. Do not interpret relative temporal expressions
    - Correct country names that are misspelled.Do not invent, add, or return countries that do not exist."
    - Even if there is a single country, return its property as "countries". 
    - Even if there is a single year, return its property as "years". 
    - Even if there is a single metric, return its property as "metrics".
    `
}
export const questionAndJson = {
        "question": "Analyze the reports between Germany, France and Romania",
        "jsonWithStatisticsData": jsonWithStatisticsData,
    }