import axios from 'axios';
import { CORE_API_SANDBOX_HOST, PRIVATE_KEY } from '@env';

const instance = axios.create({
    baseURL: CORE_API_SANDBOX_HOST,
    headers: {
        Authorization: `Bearer ${PRIVATE_KEY}`,
        'Content-Type': 'application/json',
    },
});

export const requestUnlock = (mac, session, email) => {
    const data = { mac, session, email };
    return instance
        .post('/unlock/', data)
        .then(response => console.log(JSON.stringify(response.data, undefined, 2)))
        .catch(error => console.log(error));
};
