import axios from 'axios';
import { PATH } from './noke-api-constants';
import { CORE_API_SANDBOX_HOST, PRIVATE_KEY } from '@env';

const instance = axios.create({
    baseURL: CORE_API_SANDBOX_HOST,
    headers: {
        Authorization: `Bearer ${PRIVATE_KEY}`,
        'Content-Type': 'application/json',
    },
});

export const requestUnlock = payload => {
    return instance
        .post(PATH.UNLOCK, payload) // { mac, session, email };
        .then(res => res)
        .catch(error => console.log(error));
};

export const requestUnshackle = payload => {
    return instance
        .post(PATH.UNSHACKLE, payload) // { mac, session, email };
        .then(res => res)
        .catch(error => console.log(error));
};

// This should be implemented at gateway
// export const requestLock = payload => {
//     return instance
//         .post(PATH.LOCK, payload)
//         .then(response => console.log(JSON.stringify(response.payload, undefined, 2)))
//         .catch(error => console.log(error));
// };
