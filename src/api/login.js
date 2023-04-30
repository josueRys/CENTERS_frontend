import axios from "axios"
import { __API__ } from "../config"

export const login = async ( {username, password} ) => {
    let status = 404
    try {
        const res = await axios.post( `${__API__}login`, {
            username,
            password
        } )
        console.log(res.data.idUser)
        localStorage.setItem('idUser', res.data.idUser)
        
        return res
        
    } catch (error) {
        console.log(error)
        return status
    }


    // console.log(res)

}