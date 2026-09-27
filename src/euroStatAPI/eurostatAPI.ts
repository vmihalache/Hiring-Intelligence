import { httpGateway } from "../httpGateway";

export class EuroStatAPI {
    requestParameters: any[] = []
    dataset?: string
    constructor (
        requestParameters: any[],
        dataset: string,
    ) {
        this.requestParameters = requestParameters
        this.dataset = dataset
    }
    euroStatApiResponse = async () => {
    const euroStatResponse = await httpGateway.fetchData(`https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/${this.dataset}?format=JSON&lang=EN${[...this.requestParameters].join("")}` , "GET", );
    let response = await euroStatResponse.json()
    const countries:string[] = Object.values(response.dimension.geo.category.label)
    const idValue = response.id[1]
    const dimensionKey = idValue as keyof typeof response.dimension;
    const labels: string[] = Object.values(response.dimension[dimensionKey].category.label)
    // console.log(labels)
    const years:string[] = Object.values(response.dimension.time.category.label)
    console.log(years)
    const value:number[] = Object.values(response.value)
    const labelOrYears = labels.every( v => v === labels[0] ) ? years : labels

    console.log("ID:", response.id);
    console.log("SIZE:", response.size);

for (const dimension of response.id) {
    console.log(
        dimension,
        response.dimension[dimension]
    );
}

const valArray: number[] = Object.values(value).map((entry) => Number(entry ?? 0));
type labelOrYears = { [labelorYears: string]: number };
type EuroStatResult = {
  [country: string]: labelOrYears | string
  intent?: string
  description?: string
  time?: string
};

const result: EuroStatResult = {};

let valueIndex = 0
countries.forEach((country, index) => {
  const countryData: labelOrYears = result[country] as labelOrYears ?? {};
  result[country] = countryData;
  valueIndex = index
  labelOrYears.forEach((label: string) => {
    countryData[label] = valArray[valueIndex] ?? 0;
    valueIndex+=countries.length 
  });
});

result["intent"] = response.label
result["description"] = response.extension.description
result["time"] = Object.keys(response.dimension.time.category.label)[0] ?? "";
console.log(result);
return result
}
}