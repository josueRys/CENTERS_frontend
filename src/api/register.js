import axios from "axios"
import { __API__ } from "../config"

const instance = axios.create({
    baseURL: `${__API__}`,
    withCredentials: true
})

export const createRegister = async ({ id_center, id_user, id_computer }) => {
    try {
        const res = await instance.post(`registers`,{
            id_center,
            id_user,
            id_computer
        })
        return res
    } catch (error) {
        return error
    }
}

export const readRegisters = async (current) => {
    try {
        const res = await instance.get(`registers?page=${current}`)
        return res
    } catch (error) {
        return error
    }
}

export const finishRegister = async (id) => {
    try {
        const res = await instance.patch(`registers/${id}`)
        return res
    } catch (error) {
        return error
    }
}