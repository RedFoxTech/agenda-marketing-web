import axios from './axios';
import {
    tokenFormated
} from './authenticate';

export const loadingSchedule = async () => axios.get('/schedule', {
    headers: {
        authorization: await tokenFormated()
    }
});

export const createSchedule = async (schedule) => axios.post('/schedule', schedule, {
    headers: {
        authorization: await tokenFormated()
    }
});

export const updateSchedule = async (schedule, id) => axios.put('/schedule/' + id, schedule, {
    headers: {
        authorization: await tokenFormated()
    }
});

export const deleteSchedule = async (id) => axios.delete('/schedule/' + id, {
    headers: {
        authorization: await tokenFormated()
    }
});