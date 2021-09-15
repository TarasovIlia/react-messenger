import { useState } from 'react';

const axios = require('axios');
export default function GET_ALL_MESSAGE() {
    const [data, setData] = useState([])
    axios.get("http://localhost:3000/message")
        .then(response => setData(response.data))
    return data
}