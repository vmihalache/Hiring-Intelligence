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
   const euroStatResult : any = []

    const getEuRoStatData = async (dataset: any) => {
    const shuffleArray = Object.keys(dataset).sort(() => Math.random() - 0.5);
    const euroStatResult = Array.from(shuffleArray.slice(0, 3)).filter((keyFilter) => keyFilter !="keywords").map(key => {
                let euroStatParamatersLocal = euroStatParamaters.slice()
                const splitKey = key.split("")
                if (splitKey[splitKey.length - 1] === "Q") {
                splitKey.splice(-2)
                euroStatParamatersLocal[euroStatParamatersLocal.length - 1] += "-Q1" 
                console.log("euroStatParamaters1", euroStatParamatersLocal)
                console.log("whatToRemove",  euroStatParamatersLocal[euroStatParamatersLocal.length - 1].split("-")[0])
                console.log("euroStatParamaters2", euroStatParamatersLocal)
            }
            const euroStatAPI = new EuroStatAPI(euroStatParamatersLocal.join(""), splitKey.join(""));
            return euroStatAPI.euroStatApiResponse();
        })
        return await Promise.all(euroStatResult)
    }     
    const getDataResult = []
    if (matchingMetricKeywords(empliymentDataSets) && matchingMetricKeywords(empliymentDataSets).length > 0) {
        getDataResult.push(getEuRoStatData(empliymentDataSets))
    }
    if (matchingMetricKeywords(itDataSets) && matchingMetricKeywords(itDataSets).length > 0) {
        getDataResult.push(getEuRoStatData(itDataSets))
    }  
    const dataGatheringResults = await Promise.all(getDataResult)
    console.log("numberOfTimesRun")
    console.log("euroStatResult length before return:", euroStatResult.length);
    //  console.log("euroStatResult", euroStatResult)
    //  qwen2bObject["messages"] = [writerMessage, {role: "user", content: JSON.stringify(euroStatResult)}];
     return {
       statistics: dataGatheringResults,
        userQuestion: state.userQuestion,
    };
    
}

