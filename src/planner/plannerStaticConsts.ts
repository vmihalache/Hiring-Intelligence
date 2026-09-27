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
    - Even if there is a single country, return its property as "countries". 
    - Even if there is a single year, return its property as "years". 
    - Even if there is a single metric, return its property as "metrics".
    `
}
export const questionAndJson = {
        "question": "Analyze the reports between Germany, France and Romania",
        "jsonWithStatisticsData": jsonWithStatisticsData,
    }