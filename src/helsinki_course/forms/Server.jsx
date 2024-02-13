import axios from "axios";
const baseurl = "http://localhost:3001/blog/notes/"

function getData() {
    console.log(baseurl)
    const rq = axios.get(baseurl)
    return rq.then(resp => resp.data)
}

function createNode(node) {
    const rq = axios.post(baseurl, node)
    return rq.then(resp => resp.data)
}

function updateNode(id, node) {
    const rq = axios.put(`${baseurl}${id}`)
    return rq.then(resp => resp.data)
}

function deleteNote(id) {
    const rq = axios.delete(`${baseurl}${id}`)
    return rq.then(resp => resp.data)
}

export default { getData, createNode, updateNode, deleteNote };