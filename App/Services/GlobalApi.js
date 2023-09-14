import axios from "axios";
import { BACKEND_URL } from "@env";

const BASE_URL = `${BACKEND_URL}/api/bardapi`;

const getBardApi = (userMsg) => axios.post(BASE_URL, { prompt: userMsg });

export default {
  getBardApi,
};
