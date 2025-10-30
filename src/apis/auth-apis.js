import axios from "axios"

const port = 'http://localhost:8080/diginotes'

export const LoginApi = async(data)=>{
    const res = await axios.post('http://localhost:8080/diginotes/login',data)
    return res;
}