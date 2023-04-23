import axios from "axios"
import { __API__ } from "../config"

// crud

export const createComputers = async ({ model, company, type, id_center }) => {
    try {
        const res = await axios.post(`${__API__}computers`,{
            model,
            company,
            type,
            id_center
        })
        return res
    } catch (error) {
        return error
    }
}

export const readComputers = async (current) => {
    try {
        const res = await axios.get(`${__API__}computers?page=${current}`)
        return res
    } catch (error) {
        return error
    }
}

export const readComputer = async (id) => {
    try {
        const res = await axios.get(`${__API__}computers/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const updateComputer = async (id, form) => {
    try {
        const {model, company, type, id_center} = form
        const res = await axios.patch(`${__API__}computers/${id}`,{
            model,
            company,
            type,
            id_center
        })
        return res
    } catch (error) {
        return error
    }
}

export const deleteComputer = async (id) => {
    try {
        const res = await axios.delete(`${__API__}computers/${id}`)
        return res
    } catch (error) {
        return error
    }
}