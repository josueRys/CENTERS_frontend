import axios from "axios"
import { __API__ } from "../config"

export const login = async ( {username, password} ) => {
    let status = 404
    try {
        const res = await axios.post( `${__API__}login`, {
            username,
            password
        } )
        
        return res
        
    } catch (error) {
        return status
    }


    // console.log(res)

}