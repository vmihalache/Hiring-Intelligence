import {checkResponseMethod } from "./agentCall";

type PlannerResponse = {
    countries?: string[];
    years?: number[];
    metric?: string;
    valid?: boolean;
    reason?: string;
};

const MaximumCountriesSpecification = {
    check: (jsonReturnedByAgent: PlannerResponse | undefined) => {
        const count = jsonReturnedByAgent?.countries?.length ?? 0;
        console.log("=== Countries from Agent Response ===");
        console.log(count)
        return count < 3;
    }
};

const MinimumYearSpecification = {
    check: (jsonReturnedByAgent: PlannerResponse | undefined) => {
        const years = jsonReturnedByAgent?.years ?? [];
        console.log("=== Years from Agent Response ===");
        console.log(years);
        return Math.min(...years) > 2024;
    }
};

const MetricExistsSpecification = {
    check: (jsonReturnedByAgent: PlannerResponse | undefined) => {
        return Boolean(jsonReturnedByAgent?.metric);
    }
};
export const plannerService = async () => {

    const jsonReturnedByAgent = await checkResponseMethod() ?? {
        countries: [],
        years: [],
        metric: "",
        valid: false,
        reason: "No valid response from agent."
    };
    console.log("jsonReturnedByAgent")
    console.log(jsonReturnedByAgent)
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
    return jsonReturnedByAgent
}