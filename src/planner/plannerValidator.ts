import {checkResponseMethod } from "./agentCall";
import { parse } from 'numbers-from-words';
import wordsToNumbers from 'words-to-numbers';
import type { GraphState } from '../stateManagement';
import { plannerServiceWithValidation } from "./plannerIEuroStatIntegration";

export const plannerService = async (state: GraphState) => {
    const MaximumCountriesSpecification = {
    check: (jsonReturnedByAgent:typeof state.plannerResponse | undefined) => {
        const count = jsonReturnedByAgent?.countries?.length ?? 0;
        console.log("=== Countries from Agent Response ===");
        console.log(count)
        return count < 3;
    }
};

const MinimumYearSpecification = {
      check: (jsonReturnedByAgent: typeof state.plannerResponse | undefined) => {
        const rawYears = jsonReturnedByAgent?.years ?? [];
        console.log("=== Years from Agent Response ===");
        console.log(rawYears);

        function isNumberArray(yearsProp: unknown[]): yearsProp is number[] {
            return yearsProp.every(item => typeof item === 'number' && !Number.isNaN(item));
        }
        if (!isNumberArray(rawYears) || rawYears.length === 0) return false;
        return Math.min(...rawYears) > 2024;
}
};

const MetricExistsSpecification = {
    check: (jsonReturnedByAgent: typeof state.plannerResponse | undefined) => {
        return (jsonReturnedByAgent?.metrics?.length ?? 0) > 0;
    }
};

    const jsonReturnedByAgent: typeof state.plannerResponse = await checkResponseMethod(state) ?? {
        countries: [],
        years: [],
        metrics: [],
        valid: false,
        reason: "No valid response from agent."
    };
    const jsonNormalizer = (jsonToUse: typeof state.plannerResponse) => {
        jsonToUse.years?.forEach((val, index, arr) => {
            if (typeof val === "string" && (val.includes("last") || val.includes("previous")
            || val.includes("past") )) {
            console.log(val)
                let convertedVal = String(wordsToNumbers(val))
                const match = convertedVal.match(/\d+/) 
                console.log("match")
                console.log(typeof convertedVal)
                console.log(match)
                console.log(convertedVal)
                if (match) {
                    console.log(2026 - Number(match[0]))
                    console.log(Array.from({ length: Number(match[0]) }, (_, index) => index + (2026  - Number(match[0]))))
                    let modifiedYearArray = Array.from({ length: Number(match[0]) }, (_, index) => index + (2026  - Number(match[0])+1))
                    arr.splice(index, 1, ...modifiedYearArray);
                    console.log(arr)
                }
            }
            else {
                    arr[index] = Number(val)
                }
            if (typeof val === "string" && (val.includes("current"))) {
                arr[0] = 2026
            }

            if (typeof val === "string" && val.includes("ago")) {
                console.log("ago")
                let agoYear = String(wordsToNumbers(val)).match(/\d+/)
                if (agoYear) {
                console.log(agoYear)
                arr[0] = 2026 - Number(agoYear[0])
            }
        }
            else {
            return arr
            }
        });
    }
    console.log("jsonReturnedByAgent")
    console.log(jsonReturnedByAgent)
    jsonNormalizer(jsonReturnedByAgent)
    const plannerValidator = {
    "numberOfCountries": MaximumCountriesSpecification.check(jsonReturnedByAgent), 
    "minimumYear": MinimumYearSpecification.check(jsonReturnedByAgent), 
    "metricExists": MetricExistsSpecification.check(jsonReturnedByAgent)
}
    const failedRules = Object.entries(plannerValidator).filter(([, passed]) => !passed);
    if (failedRules.length > 0) {
    jsonReturnedByAgent.valid = false;
    jsonReturnedByAgent.reason = "Invalid plannerValidator: " + failedRules.map(([rule]) => rule).join(", ");
}
else {
    jsonReturnedByAgent.valid = true;
    jsonReturnedByAgent.reason = "Valid plannerValidator";
}
    console.log("=== Planner Validator Results ===");
    console.log(state.decision)
    console.log("reason")
    console.log(jsonReturnedByAgent)
    if (jsonReturnedByAgent.valid) {
    if (state.decision === "fetch"  || state.statistics.length === 0) {
        console.log("CURRENT QUESTION:", state.userQuestion);
        console.log("CURRENT DECISION:", state.decision);
        console.log("EXISTING STATISTICS:", JSON.stringify(state.statistics));
    const plannerValidation = await plannerServiceWithValidation(jsonReturnedByAgent, state);
    console.log("PLANNER VALIDATION RESULT:", JSON.stringify(plannerValidation, null, 2));
    // console.log(plannerValidation)
    state.decision = "reuse"
    return {
        statistics: plannerValidation.statistics,
        userQuestion: plannerValidation.userQuestion,
        decision: state.decision,
        analysis: state.analysis,
        plannerResponse: jsonReturnedByAgent
    }
}
else {
    console.log("DECISION BEFORE FETCH/REUSE:", state.decision);
    console.log("PLANNER COUNTRIES:", jsonReturnedByAgent.countries);
    console.log(
  "EXISTING STATISTICS:",
  JSON.stringify(state.statistics)
);
    return { 
        statistics: state.statistics,
        analysis: state.analysis,
        userQuestion: state.userQuestion,    
        decision: state.decision,
    }
}
}
else {
    state.decision = "invalid"
   return {
    userQuestion: state.userQuestion,
    statistics: state.statistics,
    decision: state.decision,
    analysis: state.analysis,
    plannerResponse: jsonReturnedByAgent
   }
}
}
