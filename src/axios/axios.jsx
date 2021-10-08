import axios from 'axios';

//export const API_URL = 'https://back-test1.herokuapp.com'

//for test
export const API_URL = 'http://localhost:3000'

export const API = axios.create({
  baseURL: API_URL + '/',
  headers: {
    'Content-Type': 'application/json',
  }
});