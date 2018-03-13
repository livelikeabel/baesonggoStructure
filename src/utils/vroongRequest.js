import axios from 'axios';
import qs from 'qs';

//env 설정해줘야힘.
const apiUrl = process.env.VROONG_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});
