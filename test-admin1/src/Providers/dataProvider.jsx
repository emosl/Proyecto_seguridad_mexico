import { fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const fetchJsonUtil = (url, options={})=>{
    if(!options.headers){
        options.headers=new Headers({Accept: "application/json"})
    }
    options.headers.set("Authentication", localStorage.getItem("username"));
    return fetchUtils.fetchJson(url, options);
};


export const dataProvider = jsonServerProvider("http://127.0.0.1:8000", fetchJsonUtil);