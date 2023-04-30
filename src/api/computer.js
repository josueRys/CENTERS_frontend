import axios from "axios"
import { __API__ } from "../config"

const instance = axios.create({
    baseURL: `${__API__}`,
    withCredentials: true
})

export const createComputers = async ({ model, company, type, id_center }) => {
    try {
        const res = await instance.post(`computers`,{
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

export const readComputers = async (current,idCenter) => {
    try {
        const res = await instance.get(`computers?page=${current}&idCenter=${idCenter ? idCenter : ''}`)
        return res
    } catch (error) {
        return error
    }
}

export const readComputersName = async (id_center) => {
    try {
        const res = await instance.get(`computers?idCenter=${id_center}`)
        return res
    } catch (error) {
        return error
    }
}

export const readComputer = async (id) => {
    try {
        const res = await instance.get(`computers/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const updateComputer = async (id, form) => {
    try {
        const {model, company, type, id_center} = form
        const res = await instance.patch(`computers/${id}`,{
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
        const res = await axios.delete(`computers/${id}`)
        return res
    } catch (error) {
        return error
    }
}