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
  "values": {
    "2018": 16,
    "2019": 17,
    "2020": 16,
    "2021": 18,
    "2022": 17,
    "2023": 18,
    "2024": 19,
    "2025": 16
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
export const randomQuestion = {
  "intent": "compare_remote_hiring",
  "result": {
    "Remote EU hiring": 12,
    "Domestic hiring": 87
  },
  "survey": {
    "Recruiters saying remote hiring is common": "78%"
  }
}
export const multipleReports = {
  report1: {
  Germany: {
    'Information and communications technology service managers': 1.4,
    'Software and applications developers and analysts': 58,
    'Database and network professionals': 14.3,
    'Information and communications technology operations and user support technicians': 8.4,
    'Telecommunications and broadcasting technicians': 0.2,
    'Electronics and telecommunications installers and repairers': 12.9,
    'Other information and communications technology specialists (OC2152, OC2153, OC2166, OC2356, OC2434, OC3114)': 4.8
  },
  France: {
    'Information and communications technology service managers': 4.8,
    'Software and applications developers and analysts': 45.4,
    'Database and network professionals': 8.2,
    'Information and communications technology operations and user support technicians': 13.7,
    'Telecommunications and broadcasting technicians': 8.6,
    'Electronics and telecommunications installers and repairers': 6.4,
    'Other information and communications technology specialists (OC2152, OC2153, OC2166, OC2356, OC2434, OC3114)': 12.8
  },
  Romania: {
    'Information and communications technology service managers': 11,
    'Software and applications developers and analysts': 50.7,
    'Database and network professionals': 8,
    'Information and communications technology operations and user support technicians': 7.2,
    'Telecommunications and broadcasting technicians': 4,
    'Electronics and telecommunications installers and repairers': 3.1,
    'Other information and communications technology specialists (OC2152, OC2153, OC2166, OC2356, OC2434, OC3114)': 15.9
  },
  intent: 'Distribution by occupation (ISCO-08) of the labour market demand for ICT specialists in online job advertisements - experimental statistics',
  description: '<p>The statistics in this table are published quarterly. To smooth seasonal effects, each quarter refers to the online job advertisements published during that quarter and the three preceding quarters (e.g. data points for TIME=2023-Q3 refer to the period from Q4 2022 to Q3 2023).</p>',
  time: '2026-Q1'
},
report2: {
  Germany: {
    Total: 40596.9,
    Managers: 21394.5,
    'Chief executives, senior officials and legislators': 19202.4,
    'Administrative and commercial managers': 42312.3,
    'Production and specialised services managers': 22357.5,
    'Hospitality, retail and other services managers': 19954.8,
    Professionals: 42553.4,
    'Science and engineering professionals': 22514.1,
    'Health professionals': 20039.3,
    'Teaching professionals': 39457.7,
    'Business and administration professionals': 20761.1,
    'Information and communications technology professionals': 18696.6,
    'Legal, social and cultural professionals': 1766.7,
    'Technicians and associate professionals': 1222.9,
    'Science and engineering associate professionals': 543.8,
    'Health associate professionals': 1860.6,
    'Business and administration associate professionals': 1295.7,
    'Legal, social, cultural and related associate professionals': 565,
    'Information and communications technicians': 1879.3,
    'Clerical support workers': 1310.2,
    'General and keyboard clerks': 569.1,
    'Customer services clerks': 1764.1,
    'Numerical and material recording clerks': 1221.4,
    'Other clerical support workers': 542.7,
    'Service and sales workers': 536.2,
    'Personal service workers': 417.1,
    'Sales workers': 119.1,
    'Personal care workers': 589.6,
    'Protective services workers': 458.4,
    'Skilled agricultural, forestry and fishery workers': 131.1,
    'Market-oriented skilled agricultural workers': 603,
    'Market-oriented skilled forestry, fishery and hunting workers': 468.5,
    'Subsistence farmers, fishers, hunters and gatherers': 134.5,
    'Craft and related trades workers': 536,
    'Building and related trades workers, excluding electricians': 417.1,
    'Metal, machinery and related trades workers': 118.9,
    'Handicraft and printing workers': 452.8,
    'Electrical and electronic trades workers': 281.2,
    'Food processing, wood working, garment and other craft and related trades workers': 171.5,
    'Plant and machine operators and assemblers': 460.9,
    'Stationary plant and machine operators': 286.6,
    Assemblers: 174.3,
    'Drivers and mobile plant operators': 461.9,
    'Elementary occupations': 286.7,
    'Cleaners and helpers': 175.1,
    'Agricultural, forestry and fishery labourers': 452.6,
    'Labourers in mining, construction, manufacturing and transport': 281.1,
    'Food preparation assistants': 171.5,
    'Street and related sales and service workers': 550.7,
    'Refuse workers and other elementary workers': 394.4,
    'Armed forces occupations': 156.3,
    'Commissioned armed forces officers': 569.3,
    'Non-commissioned armed forces officers': 410.3,
    'Armed forces occupations, other ranks': 159,
    'No response': 571.7
  },
  France: {
    Total: 28786.5,
    Managers: 14712.7,
    'Chief executives, senior officials and legislators': 14073.8,
    'Administrative and commercial managers': 29330.9,
    'Production and specialised services managers': 15007.1,
    'Hospitality, retail and other services managers': 14323.8,
    Professionals: 29382.9,
    'Science and engineering professionals': 15040.1,
    'Health professionals': 14342.8,
    'Teaching professionals': 28178,
    'Business and administration professionals': 14346.9,
    'Information and communications technology professionals': 13831.2,
    'Legal, social and cultural professionals': 2090.9,
    'Technicians and associate professionals': 1270.8,
    'Science and engineering associate professionals': 820.1,
    'Health associate professionals': 2169.8,
    'Business and administration associate professionals': 1321.6,
    'Legal, social, cultural and related associate professionals': 848.1,
    'Information and communications technicians': 2181.2,
    'Clerical support workers': 1331.1,
    'General and keyboard clerks': 850.1,
    'Customer services clerks': 2088.4,
    'Numerical and material recording clerks': 1270.2,
    'Other clerical support workers': 818.2,
    'Service and sales workers': 188.3,
    'Personal service workers': 124.3,
    'Sales workers': 64,
    'Personal care workers': 220.2,
    'Protective services workers': 146.1,
    'Skilled agricultural, forestry and fishery workers': 74.1,
    'Market-oriented skilled agricultural workers': 226.1,
    'Market-oriented skilled forestry, fishery and hunting workers': 150.9,
    'Subsistence farmers, fishers, hunters and gatherers': 75.2,
    'Craft and related trades workers': 188,
    'Building and related trades workers, excluding electricians': 124.3,
    'Metal, machinery and related trades workers': 63.7,
    'Handicraft and printing workers': 666.3,
    'Electrical and electronic trades workers': 333.8,
    'Food processing, wood working, garment and other craft and related trades workers': 332.5,
    'Plant and machine operators and assemblers': 675.2,
    'Stationary plant and machine operators': 340,
    Assemblers: 335.1,
    'Drivers and mobile plant operators': 675.8,
    'Elementary occupations': 340.7,
    'Cleaners and helpers': 335.1,
    'Agricultural, forestry and fishery labourers': 666.1,
    'Labourers in mining, construction, manufacturing and transport': 333.7,
    'Food preparation assistants': 332.4,
    'Street and related sales and service workers': 710.7,
    'Refuse workers and other elementary workers': 507.7,
    'Armed forces occupations': 203.1,
    'Commissioned armed forces officers': 727.7,
    'Non-commissioned armed forces officers': 518.7,
    'Armed forces occupations, other ranks': 209,
    'No response': 729.9
  },
  Romania: {
    Total: 7614.6,
    Managers: 4371.4,
    'Chief executives, senior officials and legislators': 3243.2,
    'Administrative and commercial managers': 7689.2,
    'Production and specialised services managers': 4419.5,
    'Hospitality, retail and other services managers': 3269.7,
    Professionals: 7694.3,
    'Science and engineering professionals': 4421.9,
    'Health professionals': 3272.5,
    'Teaching professionals': 7578.8,
    'Business and administration professionals': 4344.9,
    'Information and communications technology professionals': 3233.9,
    'Legal, social and cultural professionals': 206.9,
    'Technicians and associate professionals': 139.8,
    'Science and engineering associate professionals': 67.1,
    'Health associate professionals': 210.2,
    'Business and administration associate professionals': 142.2,
    'Legal, social, cultural and related associate professionals': 68,
    'Information and communications technicians': 210.3,
    'Clerical support workers': 142.3,
    'General and keyboard clerks': 68,
    'Customer services clerks': 206.9,
    'Numerical and material recording clerks': 139.8,
    'Other clerical support workers': 67.1,
    'Service and sales workers': 58.7,
    'Personal service workers': 35.8,
    'Sales workers': 22.9,
    'Personal care workers': 59.9,
    'Protective services workers': 36.6,
    'Skilled agricultural, forestry and fishery workers': 23.3,
    'Market-oriented skilled agricultural workers': 60,
    'Market-oriented skilled forestry, fishery and hunting workers': 36.7,
    'Subsistence farmers, fishers, hunters and gatherers': 23.3,
    'Craft and related trades workers': 58.7,
    'Building and related trades workers, excluding electricians': 35.8,
    'Metal, machinery and related trades workers': 22.9,
    'Handicraft and printing workers': 43.2,
    'Electrical and electronic trades workers': 25.6,
    'Food processing, wood working, garment and other craft and related trades workers': 17.6,
    'Plant and machine operators and assemblers': 43.5,
    'Stationary plant and machine operators': 25.8,
    Assemblers: 17.7,
    'Drivers and mobile plant operators': 43.5,
    'Elementary occupations': 25.8,
    'Cleaners and helpers': 17.7,
    'Agricultural, forestry and fishery labourers': 43.2,
    'Labourers in mining, construction, manufacturing and transport': 25.6,
    'Food preparation assistants': 17.6,
    'Street and related sales and service workers': 70.7,
    'Refuse workers and other elementary workers': 55.6,
    'Armed forces occupations': 15.1,
    'Commissioned armed forces officers': 71.5,
    'Non-commissioned armed forces officers': 56.3,
    'Armed forces occupations, other ranks': 15.2,
    'No response': 71.5
  },
  intent: 'Employed persons by detailed occupation (ISCO-08 two digit level)',
  description: undefined,
  time: '2025'
},
report3: {
  Germany: { '2025': -0.2 },
  France: { '2025': 0.2 },
  Romania: { '2025': -3.5 },
  intent: 'Overall employment growth',
  description: "The indicator 'employment growth' gives the change in percentage from one year to another of the total number of employed persons on the economic territory of the country or the geographical area.",
  time: '2025'
}
}