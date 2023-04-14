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