import axios from 'axios';

// This logic automatically picks the right URL:
// - On Vercel, it uses the Environment Variable you set.
// - On your computer, it defaults to localhost.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;