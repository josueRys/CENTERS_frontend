import axios from "axios"
import { __API__ } from "../config"

export const createUser = async ({username, password, phone_number}) => {
    const res = await axios.post( `${__API__}users`,{
        username,
        password,
        phone_number
    } )

    return res.status
}

export const readUsers = async () => {
    const res = await axios.get(`${__API__}users?page=1`)
    return res
}