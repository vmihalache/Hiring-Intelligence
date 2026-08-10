import {checkResponseMethod } from "./agentCall";

const MaximumCountriesSpecification = {
    check :  (jsonReturnedByAgent: { countries: string}) =>
        {return jsonReturnedByAgent.countries.length < 3; }
}
const MinimumYearSpecification = {
    check :  (jsonReturnedByAgent: { years: number[]}) =>
        {return Math.min(...jsonReturnedByAgent.years) > 2024; }
}
const MetricExistsSpecification = {
    check :  (jsonReturnedByAgent: { metric: string}) =>
        {return Boolean(jsonReturnedByAgent.metric); }
}
export const plannerService = async () => {

    const jsonReturnedByAgent = await checkResponseMethod();  
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