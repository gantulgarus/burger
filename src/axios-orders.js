import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-ac617.firebaseio.com/",
});

export default instance;
