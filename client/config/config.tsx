import axios from "axios";

// Configure axios in order to be able to make api requests to the laravel backend.
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8001";
