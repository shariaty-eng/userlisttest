import { API_URL } from "@/configs/global";
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";

const httpService = axios.create({
baseURL:API_URL, 
headers:{
    "Content-Type":"application/json",
}
})


httpService.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    // handl error type
       console.log(error)
}
)

async function apiBase<T>(url:string,options?:AxiosRequestConfig):Promise<T>{
    const response:AxiosResponse = await httpService(url, options);
    return response.data as T;
}

async function readData<T>(url:string,headers?:AxiosRequestHeaders):Promise<T>{
    const options:AxiosRequestConfig ={
        headers:headers, 
        method:"GET",
    };
    return await apiBase<T>(url, options)
}

// other request if needed

export{readData}