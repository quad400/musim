import axios, { AxiosResponseHeaders } from 'axios'

const api = axios.create({
    baseURL: 'https://api.deezer.com/',
    timeout: 10000,
})

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response) {
            const errorMessage = error.response.data
            //   error.response.data?.detail || error.response.data?.email[0] || "Something went wrong";
            return Promise.reject(new Error(errorMessage));
        } else if (error.request) {
            console.log(error.request.data);

            return Promise.reject(new Error("No Internet Connection"));
        } else {
            return Promise.reject(new Error(error));
        }
    }
);

export default api