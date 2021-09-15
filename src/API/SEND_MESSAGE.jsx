const axios = require('axios');
export default function SEND_MESSAGE(message) {
    const sendDate = Date.now()
    const newMessage = {
        body: message, 
        from: 'me',
        date: sendDate
    }
    axios.post("http://localhost:3000/message", newMessage)
}