import axios from "axios"
import { __API__ } from "../config"

const instance = axios.create({
    baseURL: `${__API__}`,
    withCredentials: true
})

export const createUser = async ({username, password, phone_number}) => {
    const res = await instance.post( `users`,{
        username,
        password,
        phone_number
    } )

    return res.status
}

export const readUser = async (id) => {
    const res = await instance.get(`users/${id}`)
    return res
}

export const readUserName = async (idCenter) => {
    try {
        const res = await instance.get(`users?idCenter=${idCenter}`)
        return res
    } catch (error) {
        return error
    }
}

export const updateUser = async (id, form) => {
    const { username, password, phone_number } = form
    const res = await instance.patch(`users/${id}`,{
        username,
        password,
        phone_number
    })
    
    return res.status
}

export const deleteUser = async (id) => {
    const res = await instance.delete(`users/${id}`)
    return res
}

export const readUsers = async (current,idCenter) => {
    let res = {data: { data:[],totalCount:0 } }
    try {
        res = await instance.get( `users?page=${current}&idCenter=${idCenter ? idCenter : ''}`)
        return res
    } catch (error) {
        return res       
    }
}