import axios from "axios"
import { __API__ } from "../config"

// CRUD

export const createRegister = async ({ id_center, id_user, id_computer }) => {
    try {
        const res = await axios.post(`${__API__}registers`,{
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
        const res = await axios.get(`${__API__}registers?page=${current}`)
        return res
    } catch (error) {
        return error
    }
}

export const finishRegister = async (id) => {
    try {
        const res = await axios.patch(`${__API__}registers/${id}`)
        return res
    } catch (error) {
        return error
    }
}