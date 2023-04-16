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

export const readUser = async (id) => {
    const res = await axios.get(`${__API__}users/${id}`)
    return res
}

export const updateUser = async (id, form) => {
    const { username, password, phone_number } = form
    const res = await axios.patch(`${__API__}users/${id}`,{
        username,
        password,
        phone_number
    })
    
    return res.status
}

export const deleteUser = async (id) => {
    const res = await axios.delete(`${__API__}users/${id}`)
    return res
}

export const readUsers = async (current) => {
    const res = await axios.get(`${__API__}users?page=${current}`)
    return res
    }