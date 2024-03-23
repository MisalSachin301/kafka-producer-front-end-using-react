import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:9191/producer/app'

export const publishCustomerEvent = () => {
    return axios.post(REST_API_BASE_URL+"/publish/events")
}