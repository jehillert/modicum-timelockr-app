import axios from 'axios';
import { CORE_API_SANDBOX_HOST, MOBILE_KEY, PRIVATE_KEY } from '@env';

const PATH = {
    ACTIVITY: '/activity/',
    KEYS: '/keys/',
    LOCK: '/lock/',
    UNLOCK: '/unlock/',
    UNSHACKLE: '/unshackle/',
    UPLOAD: '/upload/',
};

const instance = axios.create({
    baseURL: CORE_API_SANDBOX_HOST,
    headers: {
        Authorization: `Bearer ${PRIVATE_KEY}`,
        'Content-Type': 'application/json',
    },
});

/**
 *
 * @function fetchLocks
 * @param { array<string> } payload = { macs: [mac1, mac2, mac3] }
 * @return { Promise<Object> }
 * https://noke.com/core-api#lock
 * Used to view information about locks.Supports finding a single lock, multiple locks,
 * or all locks associated with a company.
 *
 **/
const fetchLocks = payload => {
    return instance
        .post(PATH.LOCK, payload)
        .then(response => console.log(JSON.stringify(response.payload, undefined, 2)))
        .catch(error => console.log(error));
};

/**
 *
 * @function requestUnlock
 * @param { string, string, string } payload = { mac, session, email }
 * @return { Promise<Object> }
 * https://noke.com/core-api#unlock
 * Used to unlock a lock. Requires a session string from the lock, a mac address, and can
 * optionally take a tracking key to associate to lock activity.
 *
 **/
const requestUnlock = payload => {
    return instance
        .post(PATH.UNLOCK, payload)
        .then(res => res)
        .catch(error => console.log(error));
};

/**
 *
 * @function requestUnshackle
 * @param { object } payload = { mac, session, email }
 * @return { Promise<Object> }
 * https://noke.com/core-api#unshackle
 * Used to remove the shackle from an HD padlock. Operates identically to the /unlock/ endpoint.
 *
 **/
const requestUnshackle = payload => {
    return instance
        .post(PATH.UNSHACKLE, payload)
        .then(res => res)
        .catch(error => console.log(error));
};

/**
 *
 * @function fetchOfflineKeys
 * @param { object } payload = { macs: [mac1, mac2, mac3], tracking_keys: [key1, key2] }    // CREATE
 * @param { object } payload = {}                                                           // DISPLAY, all keys
 * @param { object } payload = { display: { macs: [mac1, mac2, mac3] } }                    // DISPLAY, limit by mac
 * @param { object } payload = { display: { tracking_keys: [key1, key2] } }                 // DISPLAY, limit by tracking key
 * @param { object } payload = { "revoke": [ {"tracking_keys": [key1], "macs": [mac1]} ] }  // REVOKE specific keys for specific macs
 * @param { object } payload = { "revoke": [ { "macs": [mac1, mac2, mac3] } ] }             // REVOKE all keys for mac/macs
 * @param { object } payload = { "revoke": [ { "tracking_keys": [key1, key2] } ] }          // REVOKE all keys for tracking key/keys
 * @return { Promise<Object> }
 * NOTE: Each 'mac' address is provided full set of 'tracking_keys.'
 * https://noke.com/core-api#keys
 * Used to request offline keys for a lock or locks, invalidate any existing keys, or view the
 * status of any offline keys. These offline keys can be used by the mobile libraries to unlock
 * the lock without an active network connection.
 *
 **/
const fetchOfflineKeys = payload => {
    return instance
        .post(PATH.KEYS, payload)
        .then(res => res)
        .catch(error => console.log(error));
};

/**
 *
 * @function postActivityLogs
 * @param { object } payload = { logs: [{ session, mac, received_time, responses }] } || { logs: [{ string, string, int, responses }] }
 * @return { Promise<Object> }
 * https://noke.com/core-api#upload
 * Used to upload lock activity logs from a phone app using the Nokē Mobile library. Requires a
 * session string from the lock (see Nokē Mobile library documentation: iOS/Android), a mac address,
 * and can optionally take a tracking key to associate to lock activity.
 *
 * NOTE: this route uses a mobile api key rather than the server api key.
 *
 **/
const postActivityLogs = payload => {
    const config = {
        headers: {
            Authorization: `Bearer ${MOBILE_KEY}`,
        },
    };

    return instance
        .post(PATH.KEYS, payload, config)
        .then(res => res)
        .catch(error => console.log(error));
};

/**
 *
 * @function fetchActivityLogs
 * @param { object } payload = {}
 * @param { object } payload = {}
 * @return { Promise<Object> }
 * https://noke.com/core-api#activity
 * Used to view human-readable activity logs. Can find specific activity logs via filters or can be
 * used to find the most recent activity for a company. Use as many or as few filters to narrow down
 * specific activity data.
 * NOTE: this route uses a mobile api key rather than the server api key.
 *
 **/
const fetchActivityLogs = payload => {
    const config = {
        headers: {
            Authorization: `Bearer ${MOBILE_KEY}`,
        },
    };

    return instance
        .post(PATH.KEYS, payload, config)
        .then(res => res)
        .catch(error => console.log(error));
};

const nokeApi = {
    fetchLocks,
    requestUnlock,
    requestUnshackle,
    fetchOfflineKeys,
    postActivityLogs,
    fetchActivityLogs,
};

export default nokeApi;
