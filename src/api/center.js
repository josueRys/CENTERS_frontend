import axios from "axios"
import { __API__} from "../config"

export const createCenter = async ( { name,coordinate, address, phone_number } ) => {
    const res = await axios.post( `${__API__}centers` , {
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
        res = await axios.get( `${__API__}centers?page=${current}`)
        return res
    } catch (error) {
        return res       
    }
}

export const readCentersName = async () => {
    try {
        const res = await axios.get(`${__API__}centers?type=select`)
        return res
    } catch (error) {
        return error
    }
}

export const deleteCenter = async (id) => {
    const res = await axios.delete(`${__API__}centers/${id}`)
    return res
}

export const readCenter = async (id) => {
    const res = await axios.get(`${__API__}centers/${id}`)
    return res
}

export const updateCenter = async (id, form) => {
    let { name, phone_number, address, coordinate } = form
    const res = await axios.patch(`${__API__}centers/${id}`,{
        name,
        phone_number,
        address,
        coordinate,
    })
    return res.status
}