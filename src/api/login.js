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
        console.log(res)        
        return res
        
    } catch (error) {
        console.log(error)
        return status
    }


    // console.log(res)

}