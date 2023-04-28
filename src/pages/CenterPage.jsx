import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { readCenter } from "../api/center"
import { Empty } from "antd"

const CenterPage = () => {
    
    const { id }  = useParams()
    const [ center, setCenter ] = useState(null)

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        const res = await readCenter(id)
        if (res.status === 200){
            setCenter(res.data)
            // const center = res.data
            // console.log(center)
        }
    }

    console.log(id)



    return (
        center && <div>
                    <h1> {center.id} </h1>
                </div>
    )
}

export default CenterPage