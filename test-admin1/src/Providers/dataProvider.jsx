//imports from react-admin and ra-data-json-server
import { fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

//custom fetchJsonUtil function to add the authentication header
const fetchJsonUtil = (url, options={})=>{
    if(!options.headers){
        options.headers=new Headers({Accept: "application/json"})
    }
    options.headers.set("Authentication", localStorage.getItem("auth"));
    return fetchUtils.fetchJson(url, options);
};

//export the dataProvider with the custom fetchJsonUtil
export const dataProvider = jsonServerProvider("http://127.0.0.1:8000", fetchJsonUtil);