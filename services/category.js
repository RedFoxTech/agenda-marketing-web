import axios from './axios'
import {
    tokenFormated
} from './authenticate';

export const loadingCategory = async () => axios.get('/category', {
    headers: {
        authorization: await tokenFormated()
    }
});

export const createCategory = async (category) => axios.post('/category', category, {
    headers: {
        authorization: await tokenFormated()
    }
});

export const updateCategory = async (category, id) => axios.put('/category/' + id, category, {
    headers: {
        authorization: await tokenFormated()
    }
});

export const deleteCategory = async (id) => axios.delete('/category/' + id, {
    headers: {
        authorization: await tokenFormated()
    }
});