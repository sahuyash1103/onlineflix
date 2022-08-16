import axios from 'axios';

/* Base URL to make request to the movie database */
const axios_instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
    
});

export default axios_instance;