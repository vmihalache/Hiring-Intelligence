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
        const euroStatResult = Array.from(shuffleArray.slice(0, 3)).filter((keyFilter) => keyFilter != "keywords").map(key => {
            let euroStatParamatersLocal = euroStatParamaters.slice();
            const splitKey = key.split("");
            if (splitKey[splitKey.length - 1] === "Q") {
                splitKey.splice(-2);
                euroStatParamatersLocal[euroStatParamatersLocal.length - 1] += "-Q1";
                console.log("euroStatParamaters1", euroStatParamatersLocal);
                console.log("whatToRemove", euroStatParamatersLocal[euroStatParamatersLocal.length - 1].split("-")[0]);
                console.log("euroStatParamaters2", euroStatParamatersLocal);
            }
            const euroStatAPI = new eurostatAPI_1.EuroStatAPI(euroStatParamatersLocal.join(""), splitKey.join(""));
            return euroStatAPI.euroStatApiResponse();
        });
        return await Promise.all(euroStatResult);
    };
    const getDataResult = [];
    if (matchingMetricKeywords(euroStatAPIDataSets_1.empliymentDataSets) && matchingMetricKeywords(euroStatAPIDataSets_1.empliymentDataSets).length > 0) {
        getDataResult.push(getEuRoStatData(euroStatAPIDataSets_1.empliymentDataSets));
    }
    if (matchingMetricKeywords(euroStatAPIDataSets_1.itDataSets) && matchingMetricKeywords(euroStatAPIDataSets_1.itDataSets).length > 0) {
        getDataResult.push(getEuRoStatData(euroStatAPIDataSets_1.itDataSets));
    }
    const dataGatheringResults = await Promise.all(getDataResult);
    console.log("numberOfTimesRun");
    console.log("euroStatResult length before return:", euroStatResult.length);
    // console.log("euroStatResult2", getDataResult)
    console.log("euroStatResult2", JSON.stringify(dataGatheringResults, null, 2));
    //  qwen2bObject["messages"] = [writerMessage, {role: "user", content: JSON.stringify(euroStatResult)}];
    return {
        statistics: dataGatheringResults,
        userQuestion: state.userQuestion,
    };
};
exports.plannerServiceWithValidation = plannerServiceWithValidation;
//# sourceMappingURL=plannerIEuroStatIntegration.js.map