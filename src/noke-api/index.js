import axios from 'axios';
import { CORE_API_SANDBOX_HOST, MOBILE_KEY } from '@env';

const instance = axios.create({
    baseURL: CORE_API_SANDBOX_HOST,
    headers: { Authorization: `Bearer ${MOBILE_KEY}` },
});

export const requestUnlock = (nokeLock, email) => {
    const session = nokeLock.getSession();
    const mac = nokeLock.getMac();

    return instance
        .post('/unlock/', { session, mac, email })
        .then(response => response)
        .catch(error => console.log(error));
};
