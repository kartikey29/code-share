import Axios from "axios";

const api = Axios.create({
  baseURL: "https://code-share-backend-app.herokuapp.com/",
});

export default api;
