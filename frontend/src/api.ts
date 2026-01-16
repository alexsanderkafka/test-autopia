import axios from "axios";

export const pokemonApi: any = axios.create({
    baseURL: "https://backend-autumn-sun-2532.fly.dev/api/",
});