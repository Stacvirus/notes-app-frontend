import axios from 'axios';
const baseurl = 'http://localhost:3001/blog/notes/'
const loginUrl = 'http://localhost:3001/blog/login/'

//user request functions
let token = null;
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const userLogin = async (userCredentials) => {
    try {
        const req = await axios.post(loginUrl, userCredentials);
        return req.data;
    } catch (error) {
        console.log(error);
    }
}

//notes request functions

function getData() {
    const rq = axios.get(baseurl)
    return rq.then(resp => resp.data)
}

const createNode = async (node) => {
    const config = { headers: { Authorization: token }, }
    const rq = await axios.post(baseurl, node, config);
    return rq.data;
}

function updateNode(id, node) {
    const rq = axios.put(`${baseurl}${id}`, node)
    return rq.then(resp => resp.data)
}

function deleteNote(id) {
    const rq = axios.delete(`${baseurl}${id}`)
    return rq.then(resp => resp.data)
}


export default {
    getData,
    createNode,
    updateNode,
    deleteNote,
    userLogin,
    setToken
};