import axios from 'axios';
import qs from 'qs';
const apiUrl = process.env.PLATING_VROONG_API_URL;

//env 설정해줘야힘.s

export const api = axios.create({
  baseURL: apiUrl,
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});
