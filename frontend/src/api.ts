import axios from "axios";

export const pokemonApi: any = axios.create({
    baseURL: "http://localhost:8080/api/",
});