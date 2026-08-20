import { flushCompileCache } from "node:module";
import { httpGateway } from "../httpGateway";

class EuroStatAPI {
    requestParameters: any[] = []
    constructor (
        requestParameters: any[]
    ) {
        this.requestParameters = requestParameters
    }
    agentResponse = async () => {
        let check = `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tesem040?format=JSON&lang=EN${[...this.requestParameters]}`
        console.log(check)
        const euroStatResponse = await httpGateway.fetchData(`https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/tesem040?format=JSON&lang=EN${[...this.requestParameters].join("")}` , "GET", );
        // console.log(euroStatResponse)
        return euroStatResponse
    } 
}
const euroStat = new EuroStatAPI(['&time=2024','&time=2025', '&time=2023', "&geo=DE", "&geo=FR", "&geo=RO"])
 euroStat.agentResponse().then(async res => {
    let response = await res.json()
    const countries:string[] = Object.values(response.dimension.geo.category.label)
    console.log(countries)
    const years:string[] = Object.values(response.dimension.time.category.label)
    console.log(years)
    const value:number[] = Object.values(response.value)
    console.log(value)
    const fullProfile = { ...countries, ...years, ...value };
    console.log(fullProfile)

  const valueToBeFilled = {
  "intent": "",
  "countries": [],
  "metric": "",
  "years": "",
  "values": {
    "country": {
        "year": ""
    } 
  }
}
const valArray: number[] = Object.values(value).map((entry) => Number(entry ?? 0));
type YearData = { [year: string]: number };
const result: { [country: string]: YearData } = {};

let valueIndex = 0
countries.forEach((country) => {
  const countryData: YearData = result[country] ?? {};
  result[country] = countryData;

  years.forEach((year: string) => {
    countryData[year] = valArray[valueIndex] ?? 0;
    valueIndex++;
  });
});
result["intent"] = response.label
result["description"] = response.extension.description
console.log(result);
 })