export declare const countryComparison: {
    intent: string;
    countries: string[];
    metric: string;
    years: string;
    result: {
        Romania: {
            "2020": number;
            "2025": number;
        };
        Germany: {
            "2020": number;
            "2025": number;
        };
    };
};
export declare const trend: {
    intent: string;
    country: string;
    metric: string;
    years: string;
    values: {
        "2018": number;
        "2019": number;
        "2020": number;
        "2021": number;
        "2022": number;
        "2023": number;
        "2024": number;
        "2025": number;
    };
};
export declare const weirdData: {
    intent: string;
    countries: string[];
    metric: string;
    years: string;
    result: {
        Romania: {
            "2023": null;
            "2024": number;
            "2025": number;
        };
        Germany: {
            "2023": number;
            "2024": null;
            "2025": number;
        };
    };
};
export declare const contradictory: {
    intent: string;
    result: {
        "Remote EU hiring": number;
        "Domestic hiring": number;
    };
    survey: {
        "Recruiters saying remote hiring is common": string;
    };
};
export declare const randomQuestion: {
    intent: string;
    result: {
        "Remote EU hiring": number;
        "Domestic hiring": number;
    };
    survey: {
        "Recruiters saying remote hiring is common": string;
    };
};
export declare const multipleReports: {
    report1: {
        Germany: {
            'Information and communications technology service managers': number;
            'Software and applications developers and analysts': number;
            'Database and network professionals': number;
            'Information and communications technology operations and user support technicians': number;
            'Telecommunications and broadcasting technicians': number;
            'Electronics and telecommunications installers and repairers': number;
            'Other information and communications technology specialists (OC2152, OC2153, OC2166, OC2356, OC2434, OC3114)': number;
        };
        France: {
            'Information and communications technology service managers': number;
            'Software and applications developers and analysts': number;
            'Database and network professionals': number;
            'Information and communications technology operations and user support technicians': number;
            'Telecommunications and broadcasting technicians': number;
            'Electronics and telecommunications installers and repairers': number;
            'Other information and communications technology specialists (OC2152, OC2153, OC2166, OC2356, OC2434, OC3114)': number;
        };
        Romania: {
            'Information and communications technology service managers': number;
            'Software and applications developers and analysts': number;
            'Database and network professionals': number;
            'Information and communications technology operations and user support technicians': number;
            'Telecommunications and broadcasting technicians': number;
            'Electronics and telecommunications installers and repairers': number;
            'Other information and communications technology specialists (OC2152, OC2153, OC2166, OC2356, OC2434, OC3114)': number;
        };
        intent: string;
        description: string;
        time: string;
    };
    report2: {
        Germany: {
            Total: number;
            Managers: number;
            'Chief executives, senior officials and legislators': number;
            'Administrative and commercial managers': number;
            'Production and specialised services managers': number;
            'Hospitality, retail and other services managers': number;
            Professionals: number;
            'Science and engineering professionals': number;
            'Health professionals': number;
            'Teaching professionals': number;
            'Business and administration professionals': number;
            'Information and communications technology professionals': number;
            'Legal, social and cultural professionals': number;
            'Technicians and associate professionals': number;
            'Science and engineering associate professionals': number;
            'Health associate professionals': number;
            'Business and administration associate professionals': number;
            'Legal, social, cultural and related associate professionals': number;
            'Information and communications technicians': number;
            'Clerical support workers': number;
            'General and keyboard clerks': number;
            'Customer services clerks': number;
            'Numerical and material recording clerks': number;
            'Other clerical support workers': number;
            'Service and sales workers': number;
            'Personal service workers': number;
            'Sales workers': number;
            'Personal care workers': number;
            'Protective services workers': number;
            'Skilled agricultural, forestry and fishery workers': number;
            'Market-oriented skilled agricultural workers': number;
            'Market-oriented skilled forestry, fishery and hunting workers': number;
            'Subsistence farmers, fishers, hunters and gatherers': number;
            'Craft and related trades workers': number;
            'Building and related trades workers, excluding electricians': number;
            'Metal, machinery and related trades workers': number;
            'Handicraft and printing workers': number;
            'Electrical and electronic trades workers': number;
            'Food processing, wood working, garment and other craft and related trades workers': number;
            'Plant and machine operators and assemblers': number;
            'Stationary plant and machine operators': number;
            Assemblers: number;
            'Drivers and mobile plant operators': number;
            'Elementary occupations': number;
            'Cleaners and helpers': number;
            'Agricultural, forestry and fishery labourers': number;
            'Labourers in mining, construction, manufacturing and transport': number;
            'Food preparation assistants': number;
            'Street and related sales and service workers': number;
            'Refuse workers and other elementary workers': number;
            'Armed forces occupations': number;
            'Commissioned armed forces officers': number;
            'Non-commissioned armed forces officers': number;
            'Armed forces occupations, other ranks': number;
            'No response': number;
        };
        France: {
            Total: number;
            Managers: number;
            'Chief executives, senior officials and legislators': number;
            'Administrative and commercial managers': number;
            'Production and specialised services managers': number;
            'Hospitality, retail and other services managers': number;
            Professionals: number;
            'Science and engineering professionals': number;
            'Health professionals': number;
            'Teaching professionals': number;
            'Business and administration professionals': number;
            'Information and communications technology professionals': number;
            'Legal, social and cultural professionals': number;
            'Technicians and associate professionals': number;
            'Science and engineering associate professionals': number;
            'Health associate professionals': number;
            'Business and administration associate professionals': number;
            'Legal, social, cultural and related associate professionals': number;
            'Information and communications technicians': number;
            'Clerical support workers': number;
            'General and keyboard clerks': number;
            'Customer services clerks': number;
            'Numerical and material recording clerks': number;
            'Other clerical support workers': number;
            'Service and sales workers': number;
            'Personal service workers': number;
            'Sales workers': number;
            'Personal care workers': number;
            'Protective services workers': number;
            'Skilled agricultural, forestry and fishery workers': number;
            'Market-oriented skilled agricultural workers': number;
            'Market-oriented skilled forestry, fishery and hunting workers': number;
            'Subsistence farmers, fishers, hunters and gatherers': number;
            'Craft and related trades workers': number;
            'Building and related trades workers, excluding electricians': number;
            'Metal, machinery and related trades workers': number;
            'Handicraft and printing workers': number;
            'Electrical and electronic trades workers': number;
            'Food processing, wood working, garment and other craft and related trades workers': number;
            'Plant and machine operators and assemblers': number;
            'Stationary plant and machine operators': number;
            Assemblers: number;
            'Drivers and mobile plant operators': number;
            'Elementary occupations': number;
            'Cleaners and helpers': number;
            'Agricultural, forestry and fishery labourers': number;
            'Labourers in mining, construction, manufacturing and transport': number;
            'Food preparation assistants': number;
            'Street and related sales and service workers': number;
            'Refuse workers and other elementary workers': number;
            'Armed forces occupations': number;
            'Commissioned armed forces officers': number;
            'Non-commissioned armed forces officers': number;
            'Armed forces occupations, other ranks': number;
            'No response': number;
        };
        Romania: {
            Total: number;
            Managers: number;
            'Chief executives, senior officials and legislators': number;
            'Administrative and commercial managers': number;
            'Production and specialised services managers': number;
            'Hospitality, retail and other services managers': number;
            Professionals: number;
            'Science and engineering professionals': number;
            'Health professionals': number;
            'Teaching professionals': number;
            'Business and administration professionals': number;
            'Information and communications technology professionals': number;
            'Legal, social and cultural professionals': number;
            'Technicians and associate professionals': number;
            'Science and engineering associate professionals': number;
            'Health associate professionals': number;
            'Business and administration associate professionals': number;
            'Legal, social, cultural and related associate professionals': number;
            'Information and communications technicians': number;
            'Clerical support workers': number;
            'General and keyboard clerks': number;
            'Customer services clerks': number;
            'Numerical and material recording clerks': number;
            'Other clerical support workers': number;
            'Service and sales workers': number;
            'Personal service workers': number;
            'Sales workers': number;
            'Personal care workers': number;
            'Protective services workers': number;
            'Skilled agricultural, forestry and fishery workers': number;
            'Market-oriented skilled agricultural workers': number;
            'Market-oriented skilled forestry, fishery and hunting workers': number;
            'Subsistence farmers, fishers, hunters and gatherers': number;
            'Craft and related trades workers': number;
            'Building and related trades workers, excluding electricians': number;
            'Metal, machinery and related trades workers': number;
            'Handicraft and printing workers': number;
            'Electrical and electronic trades workers': number;
            'Food processing, wood working, garment and other craft and related trades workers': number;
            'Plant and machine operators and assemblers': number;
            'Stationary plant and machine operators': number;
            Assemblers: number;
            'Drivers and mobile plant operators': number;
            'Elementary occupations': number;
            'Cleaners and helpers': number;
            'Agricultural, forestry and fishery labourers': number;
            'Labourers in mining, construction, manufacturing and transport': number;
            'Food preparation assistants': number;
            'Street and related sales and service workers': number;
            'Refuse workers and other elementary workers': number;
            'Armed forces occupations': number;
            'Commissioned armed forces officers': number;
            'Non-commissioned armed forces officers': number;
            'Armed forces occupations, other ranks': number;
            'No response': number;
        };
        intent: string;
        description: undefined;
        time: string;
    };
    report3: {
        Germany: {
            '2025': number;
        };
        France: {
            '2025': number;
        };
        Romania: {
            '2025': number;
        };
        intent: string;
        description: string;
        time: string;
    };
};
//# sourceMappingURL=mockedResponses.d.ts.map