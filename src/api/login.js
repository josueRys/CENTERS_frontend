import axios from "axios"
import { __API__ } from "../config"

const instance = axios.create({
    baseURL: `${__API__}`,
    withCredentials: true
})

export const login = async ( {username, password} ) => {
    let status = 404
    try {
        const res = await instance.post( `login`, {
            username,
            password
        } )        
        return res
        
    } catch (error) {
        console.log(error)
        return status
    }
}

export const logout = async () => {
    try {
        const res = await instance.post(`logout`)
        return res
    } catch (error) {
        return error
    }
}