import axios from 'axios';

const URL = 'http://localhost:8000';

export const register = async (user) => {
    try {
        return await axios.post(`${URL}/register`, user);
    } catch (error) {
        console.log('Error while calling Register API', error);
    }
}

export const login = async (user) => {
    try {
        return await axios.post(`${URL}/login`, user, { withCredentials: true });
    } catch (error) {
        console.log('Error while calling Login API', error);
    }
}

export const logout = async => {
    try {
        return axios.get(`${URL}/logout`, { withCredentials: true });
    } catch (error) {
        console.log('Error while calling Logout API', error);
    }
}

export const CreatePost = async (post) => {
    try {
        return await axios.post(`${URL}/create`, post, { withCredentials: true });
    } catch (error) {
        console.log('Error while calling CreatePost API', error);
    }
}

export const getAllPosts = async (param) => {
    try {
        let response = await axios.get(`${URL}/posts${param}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log('Error while calling getAllPosts API ', error);
    }
}

export const getPost = async ({ id }) => {
    try {
        let response = await axios.get(`${URL}/post/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost', error);
    }
}

export const updatePost = async ({ id }, post) => {
    try {
        return await axios.put(`${URL}/update/${id}`, post, { withCredentials: true });

    } catch (error) {
        console.log('Error while calling editPost', error);
    }
}

export const deletePost = async (id) => {
    try {
        await axios.delete(`${URL}/delete/${id}`, { withCredentials: true });
    } catch (error) {
        console.log('Error while calling deletePost', error);
    }
}


export const uploadImage = async (data) => {
    try {
        return await axios.post(`${URL}/file/upload`, data, { withCredentials: true });
    } catch (error) {
        console.log('Error while calling uploadFile', error);
    }
}

export const newAnswer = async (answer) => {
    try {
        return await axios.post(`${URL}/answer/new/`, answer, { withCredentials: true });
    } catch (error) {
        console.log('Error while calling newAnswer API ', error)
    }
}

export const getAnswers = async (id) => {
    try {
        let response = await axios.get(`${URL}/answers/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log('Error while calling getAnswers API ', error)
    }
}

export const deleteAnswer = async (id) => {
    try {
        return await axios.delete(`${URL}/answer/delete/${id}`, { withCredentials: true });
    } catch (error) {
        console.log('Error while calling deleteAnswer API ', error)
    }
}