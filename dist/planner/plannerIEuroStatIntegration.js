"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plannerServiceWithValidation = void 0;
const eurostatAPI_1 = require("../euroStatAPI/eurostatAPI");
const euroStatAPIDataSets_1 = require("../euroStatAPI/euroStatAPIDataSets");
const country_to_iso_1 = require("country-to-iso");
const plannerServiceWithValidation = async (plannerResult, state) => {
    console.log("KEYWORDS CURRENT STATE:", JSON.stringify(euroStatAPIDataSets_1.empliymentDataSets.keywords));
    const metricsArray = await plannerResult.metrics;
    JSON.stringify(euroStatAPIDataSets_1.empliymentDataSets.keywords).split(",").map(el => {
        console.log(el.trim().toLowerCase());
    });
    const matchingMetricKeywords = (dataSetObject) => {
        return metricsArray?.filter((a1) => dataSetObject.keywords?.[0]?.split(",").some((a2) => a1.trim().toLowerCase().includes(a2.trim().toLowerCase())) ?? false);
    };
    //    const matchingMetricKeywords = metricsArray?.filter((a1: string) => 
    //    JSON.stringify(empliymentDataSets.keywords).split(",").some(a2 => a1.trim().toLowerCase() == a2.trim().toLowerCase())
    // );
    let euroStatParamaters = plannerResult.countries?.map((country) => `&geo=${(0, country_to_iso_1.countryToAlpha2)(country)}`) ?? [];
    let euroStatYears = plannerResult.years?.map((year) => `&time=${year}`) ?? [];
    euroStatParamaters = [...euroStatParamaters, ...euroStatYears];
    console.log(euroStatParamaters.join(""));
    console.log(matchingMetricKeywords);
    const euroStatResult = [];
    const getEuRoStatData = async (dataset) => {
        const shuffleArray = Object.keys(dataset).sort(() => Math.random() - 0.5);
        for (const key of Array.from(shuffleArray.slice(0, 3))) {
            const splitKey = key.split("");
            const getEuroStatResults = async (key) => {
                if (key != "keywords") {
                    console.log("key", key);
                    console.log("euroStatParamaters", euroStatParamaters);
                    const euroStatAPI = new eurostatAPI_1.EuroStatAPI(euroStatParamaters.join(""), splitKey.join(""));
                    euroStatResult.push(await euroStatAPI.euroStatApiResponse());
                }
            };
            if (splitKey[splitKey.length - 1] === "Q") {
                splitKey.splice(-2);
                euroStatParamaters[euroStatParamaters.length - 1] += "-Q1";
                await getEuroStatResults(key);
                console.log("euroStatParamaters1", euroStatParamaters);
                //'&time=2025-Q1'
                console.log("whatToRemove", euroStatParamaters[euroStatParamaters.length - 1].split("-")[0]);
                const lastTimeParameter = euroStatParamaters.length - 1;
                const timeParameterToRemove = euroStatParamaters[lastTimeParameter].split("-");
                timeParameterToRemove[1] = "";
                euroStatParamaters[lastTimeParameter] = timeParameterToRemove.join("");
                console.log("euroStatParamaters2", euroStatParamaters);
            }
            else {
                await getEuroStatResults(key);
            }
        }
    };
    console.log("matchingMetricKeywords(itDataSets)", matchingMetricKeywords(euroStatAPIDataSets_1.itDataSets));
    if (matchingMetricKeywords(euroStatAPIDataSets_1.empliymentDataSets) && matchingMetricKeywords(euroStatAPIDataSets_1.empliymentDataSets).length > 0) {
        await getEuRoStatData(euroStatAPIDataSets_1.empliymentDataSets);
    }
    if (matchingMetricKeywords(euroStatAPIDataSets_1.itDataSets) && matchingMetricKeywords(euroStatAPIDataSets_1.itDataSets).length > 0) {
        await getEuRoStatData(euroStatAPIDataSets_1.itDataSets);
    }
    console.log("numberOfTimesRun");
    console.log("euroStatResult length before return:", euroStatResult.length);
    //  console.log("euroStatResult", euroStatResult)
    //  qwen2bObject["messages"] = [writerMessage, {role: "user", content: JSON.stringify(euroStatResult)}];
    return {
        statistics: euroStatResult,
        userQuestion: state.userQuestion
    };
};
exports.plannerServiceWithValidation = plannerServiceWithValidation;
//# sourceMappingURL=plannerIEuroStatIntegration.js.map