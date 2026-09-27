"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plannerService = void 0;
const agentCall_1 = require("./agentCall");
const words_to_numbers_1 = __importDefault(require("words-to-numbers"));
const plannerIEuroStatIntegration_1 = require("./plannerIEuroStatIntegration");
const MaximumCountriesSpecification = {
    check: (jsonReturnedByAgent) => {
        const count = jsonReturnedByAgent?.countries?.length ?? 0;
        console.log("=== Countries from Agent Response ===");
        console.log(count);
        return count < 3;
    }
};
const MinimumYearSpecification = {
    check: (jsonReturnedByAgent) => {
        const rawYears = jsonReturnedByAgent?.years ?? [];
        console.log("=== Years from Agent Response ===");
        console.log(rawYears);
        function isNumberArray(yearsProp) {
            return yearsProp.every(item => typeof item === 'number' && !Number.isNaN(item));
        }
        if (!isNumberArray(rawYears) || rawYears.length === 0)
            return false;
        return Math.min(...rawYears) > 2024;
    }
};
const MetricExistsSpecification = {
    check: (jsonReturnedByAgent) => {
        return Boolean(jsonReturnedByAgent?.metrics);
    }
};
const plannerService = async (state) => {
    const jsonReturnedByAgent = await (0, agentCall_1.checkResponseMethod)(state) ?? {
        countries: [],
        years: [],
        metric: "",
        valid: false,
        reason: "No valid response from agent."
    };
    const jsonNormalizer = (jsonToUse) => {
        jsonToUse.years?.forEach((val, index, arr) => {
            if (typeof val === "string" && (val.includes("last") || val.includes("previous")
                || val.includes("past"))) {
                console.log(val);
                let convertedVal = String((0, words_to_numbers_1.default)(val));
                const match = convertedVal.match(/\d+/);
                console.log("match");
                console.log(typeof convertedVal);
                console.log(match);
                console.log(convertedVal);
                if (match) {
                    console.log(2026 - Number(match[0]));
                    console.log(Array.from({ length: Number(match[0]) }, (_, index) => index + (2026 - Number(match[0]))));
                    let modifiedYearArray = Array.from({ length: Number(match[0]) }, (_, index) => index + (2026 - Number(match[0]) + 1));
                    arr.splice(index, 1, ...modifiedYearArray);
                    console.log(arr);
                }
            }
            else {
                arr[index] = Number(val);
            }
            if (typeof val === "string" && (val.includes("current"))) {
                arr[0] = 2026;
            }
            if (typeof val === "string" && val.includes("ago")) {
                console.log("ago");
                let agoYear = String((0, words_to_numbers_1.default)(val)).match(/\d+/);
                if (agoYear) {
                    console.log(agoYear);
                    arr[0] = 2026 - Number(agoYear[0]);
                }
            }
            else {
                return arr;
            }
        });
    };
    console.log("jsonReturnedByAgent");
    console.log(jsonReturnedByAgent);
    jsonNormalizer(jsonReturnedByAgent);
    const plannerValidator = {
        "numberOfCountries": MaximumCountriesSpecification.check(jsonReturnedByAgent),
        "minimumYear": MinimumYearSpecification.check(jsonReturnedByAgent),
        "metricExists": MetricExistsSpecification.check(jsonReturnedByAgent)
    };
    const failedRules = Object.entries(plannerValidator).filter(([, passed]) => !passed);
    if (failedRules.length > 0) {
        jsonReturnedByAgent.valid = false;
        jsonReturnedByAgent.reason = "Invalid plannerValidator: " + failedRules.map(([rule]) => rule).join(", ");
    }
    console.log("=== Planner Validator Results ===");
    // console.log(jsonReturnedByAgent)
    const plannerValidation = await (0, plannerIEuroStatIntegration_1.plannerServiceWithValidation)(jsonReturnedByAgent, state);
    console.log(plannerValidation);
    return plannerValidation;
};
exports.plannerService = plannerService;
//# sourceMappingURL=plannerValidator.js.map