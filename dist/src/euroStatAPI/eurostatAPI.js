"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EuroStatAPI = void 0;
const httpGateway_1 = require("../httpGateway");
class EuroStatAPI {
    requestParameters = [];
    dataset;
    constructor(requestParameters, dataset) {
        this.requestParameters = requestParameters;
        this.dataset = dataset;
    }
    euroStatApiResponse = async () => {
        const euroStatResponse = await httpGateway_1.httpGateway.fetchData(`https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/${this.dataset}?format=JSON&lang=EN${[...this.requestParameters].join("")}`, "GET");
        let response = await euroStatResponse.json();
        const countries = Object.values(response.dimension.geo.category.label);
        const idValue = response.id[1];
        const dimensionKey = idValue;
        const labels = Object.values(response.dimension[dimensionKey].category.label);
        // console.log(labels)
        const years = Object.values(response.dimension.time.category.label);
        console.log(years);
        const value = Object.values(response.value);
        const labelOrYears = labels.every(v => v === labels[0]) ? years : labels;
        console.log("ID:", response.id);
        console.log("SIZE:", response.size);
        for (const dimension of response.id) {
            console.log(dimension, response.dimension[dimension]);
        }
        const valArray = Object.values(value).map((entry) => Number(entry ?? 0));
        const result = {};
        let valueIndex = 0;
        countries.forEach((country, index) => {
            const countryData = result[country] ?? {};
            result[country] = countryData;
            valueIndex = index;
            labelOrYears.forEach((label) => {
                countryData[label] = valArray[valueIndex] ?? 0;
                valueIndex += countries.length;
            });
        });
        result["intent"] = response.label;
        result["description"] = response.extension.description;
        result["time"] = Object.keys(response.dimension.time.category.label)[0] ?? "";
        console.log(result);
        return result;
    };
}
exports.EuroStatAPI = EuroStatAPI;
//# sourceMappingURL=eurostatAPI.js.map