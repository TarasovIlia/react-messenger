import axios from 'axios';

export const API_URL = 'https://back-test1.herokuapp.com'

export const API = axios.create({
  baseURL: API_URL + '/',
  headers: {
    'Content-Type': 'application/json',
  }
});