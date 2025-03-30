import { useEffect,useState } from "react";


function useCurrencyInfo(currency){
    //use to store value of currency
    const [data, setData]=useState({})
    
    useEffect(()=>{
        fetch()//contain url for api to call the data
        .then((res)=>res.json())//converts response to json format
        .then((res)=>setData(res[currency]))//use method to store value in data
    },[currency])
    console.log(data);
    return data
}
export default useCurrencyInfo;