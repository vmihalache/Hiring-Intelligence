import {EuroStatAPI} from '../euroStatAPI/eurostatAPI'
import {itDataSets, empliymentDataSets } from '../euroStatAPI/euroStatAPIDataSets'
import { countryToAlpha2 } from "country-to-iso";
import { qwen2bObject, writerMessage } from "../agentData";
import { StateGraph } from '@langchain/langgraph';
import { GraphState } from '../stateManagement';


export const plannerServiceWithValidation = async (plannerResult: any, state: GraphState) => {
    
    console.log("KEYWORDS CURRENT STATE:", JSON.stringify(empliymentDataSets.keywords));
    const metricsArray = await plannerResult.metrics;

    JSON.stringify(empliymentDataSets.keywords).split(",").map(el => {
        console.log(el.trim().toLowerCase())
    })
     const matchingMetricKeywords = (dataSetObject: { keywords?: string[] }) => {
        return metricsArray?.filter((a1: string) =>
            dataSetObject.keywords?.[0]?.split(",").some(
                (a2: string) => a1.trim().toLowerCase().includes(a2.trim().toLowerCase())
            ) ?? false
        );
     };

//    const matchingMetricKeywords = metricsArray?.filter((a1: string) => 
//    JSON.stringify(empliymentDataSets.keywords).split(",").some(a2 => a1.trim().toLowerCase() == a2.trim().toLowerCase())
// );

   let euroStatParamaters = plannerResult.countries?.map((country: string) => `&geo=${countryToAlpha2(country)}`) ?? [];
   let euroStatYears = plannerResult.years?.map((year: number) => `&time=${year}`) ?? [];
   euroStatParamaters = [...euroStatParamaters, ...euroStatYears]
   console.log(euroStatParamaters.join(""))
   console.log(matchingMetricKeywords)
   const euroStatResult: { [country: string]: string | { [labelorYears: string]: number; }; intent?: string; description?: string; time?: string; }[] = []

   const getEuRoStatData = async (dataset: any) => {
    const shuffleArray = Object.keys(dataset).sort(() => Math.random() - 0.5);
    for (const key of Array.from(shuffleArray.slice(0, 3))) {
        const splitKey = key.split("")

         const getEuroStatResults = async (key: string) => {
            if (key !="keywords") {
                console.log("key", key)
                console.log("euroStatParamaters", euroStatParamaters)
                const euroStatAPI = new EuroStatAPI(euroStatParamaters.join(""), splitKey.join(""));
                euroStatResult.push(await euroStatAPI.euroStatApiResponse());
        }
    }
            if (splitKey[splitKey.length - 1] === "Q") {
                splitKey.splice(-2)
                euroStatParamaters[euroStatParamaters.length - 1] += "-Q1" 
                await getEuroStatResults(key)
                console.log("euroStatParamaters1", euroStatParamaters)
                //'&time=2025-Q1'
                console.log("whatToRemove",  euroStatParamaters[euroStatParamaters.length - 1].split("-")[0])

                const lastTimeParameter = euroStatParamaters.length - 1
                const timeParameterToRemove = euroStatParamaters[lastTimeParameter].split("-")
                timeParameterToRemove[1] = ""
                
                euroStatParamaters[lastTimeParameter] = timeParameterToRemove.join("")
                console.log("euroStatParamaters2", euroStatParamaters)
            }
            else {
                await getEuroStatResults(key)
            }
        }
    } 
    console.log("matchingMetricKeywords(itDataSets)", matchingMetricKeywords(itDataSets))
    
    if (matchingMetricKeywords(empliymentDataSets) && matchingMetricKeywords(empliymentDataSets).length > 0) {
        await getEuRoStatData(empliymentDataSets)
    }
    if (matchingMetricKeywords(itDataSets) && matchingMetricKeywords(itDataSets).length > 0) {
        await getEuRoStatData(itDataSets)
    }  
        console.log("numberOfTimesRun")
       console.log("euroStatResult length before return:", euroStatResult.length);
    //  console.log("euroStatResult", euroStatResult)
    //  qwen2bObject["messages"] = [writerMessage, {role: "user", content: JSON.stringify(euroStatResult)}];
     return {
       statistics: euroStatResult,
        userQuestion: state.userQuestion
    };
    
}

