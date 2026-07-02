export const countryComparison = {
  "intent": "compare_unemployment",
  "countries": ["Romania", "Germany"],
  "metric": "Unemployment Rate",
  "years": "2020-2025",
  "result": {
    "Romania": {
      "2020": 5.1,
      "2025": 5.8
    },
    "Germany": {
      "2020": 4.0,
      "2025": 3.6
    }
  }
}
export const trend = {
  "intent": "trend_analysis",
  "country": "Romania",
  "metric": "Youth unemployment",
  "years": "2018-2025",
  "result": {
    "2018": 16.1,
    "2019": 15.7,
    "2020": 19.2,
    "2021": 18.4,
    "2022": 17.8,
    "2023": 16.3,
    "2024": 15.4,
    "2025": 14.9
  }
}
export const weirdData = {
  "intent": "compare_employment",
  "countries": ["Romania", "Germany"],
  "metric": "Employment Rate",
  "years": "2023-2025",
  "result": {
    "Romania": {
      "2023": null,
      "2024": 67.2,
      "2025": 68.4
    },
    "Germany": {
      "2023": 75.3,
      "2024": null,
      "2025": 74.8
    }
  }
}
export const contradictory = {
  "intent": "compare_remote_hiring",
  "result": {
    "Remote EU hiring": 12,
    "Domestic hiring": 87
  },
  "survey": {
    "Recruiters saying remote hiring is common": "78%"
  }
}