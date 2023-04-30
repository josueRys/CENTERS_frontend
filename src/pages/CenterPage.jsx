import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { readCenter } from "../api/center"
import { Empty, Tabs } from "antd"
import { MdOutlineLocationCity, MdPhone } from "react-icons/md"
import Users from "../components/Users"
import { FaLaptop, FaTable, FaUser, FaUsers } from "react-icons/fa"
import Computers from "../components/Computers"
import Registers from "../components/Registers"

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

    const items = [ 
        {
            label: ( <span> <FaUsers /> Usuarios </span> ),
            key: 'Users',
            children: <Users idCenter={ id } />
        },
        {
            label: ( <span> <FaLaptop /> Computadoras </span> ),
            key: 'Computers',
            children: <Computers idCenter={ id } />
        },
        {
            label: ( <span> <FaTable /> Registros </span> ),
            key: 'Registers',
            children: <Registers />
        }
    ]

    return (
        center
            ?   <div>
                    <p className="h3 text-center" > {center.name} </p>
                    <div className="d-flex justify-content-end" >
                        <div className="d-flex align-items-center border rounded bg-white p-2 mx-2" > <MdOutlineLocationCity className="mx-2" /> <span className="border-start p-1" >{center.address}</span> </div>
                        <div className="d-flex align-items-center border rounded bg-white p-2" > <MdPhone className="mx-2" /> <span className="border-start p-1" >{center.phone_number}</span> </div>
                    </div>
                    <div>
                        <Tabs
                            style={{ marginTop: '10px' }}
                            defaultActiveKey="1"
                            // type="card"
                            size="small"
                            items={items}
                        />
                    </div>
                </div>
            :   <Empty description='Sin datos' />
    )
}

export default CenterPage