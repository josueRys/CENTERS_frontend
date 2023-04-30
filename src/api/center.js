import axios from "axios"
import { __API__} from "../config"

const instance = axios.create({
    baseURL: `${__API__}`,
    withCredentials: true
})

export const createCenter = async ( { name,coordinate, address, phone_number } ) => {
    const res = await instance.post( `centers` , {
        name,
        phone_number,
        address,
        coordinate,
    })
    return res.status
}

export const readCenters = async (current) => {
    let res = {data: { data:[],totalCount:0 } }
    try {
        res = await instance.get( `centers?page=${current}`)
        return res
    } catch (error) {
        return res       
    }
}

export const readCentersName = async () => {
    try {
        const res = await instance.get(`centers?type=select`)
        return res
    } catch (error) {
        return error
    }
}

export const deleteCenter = async (id) => {
    const res = await instance.delete(`centers/${id}`)
    return res
}

export const readCenter = async (id) => {
    const res = await instance.get(`centers/${id}`)
    return res
}

export const updateCenter = async (id, form) => {
    let { name, phone_number, address, coordinate } = form
    const res = await instance.patch(`centers/${id}`,{
        name,
        phone_number,
        address,
        coordinate,
    })
    return res.status
}