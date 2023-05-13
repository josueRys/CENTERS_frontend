import { Space, Spin } from "antd"
import { useEffect, useState } from "react"
import { logout } from "../api/login"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()
    const [status, setStatus] = useState(null)

    useEffect(() =>{
        log_out()
    },[])

    const log_out = async () => {
        const res = await logout()
        if(res.status === 200){
            setStatus(1)
            navigate('/login')
        }
    }

    return (
        !status && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
                    <Spin tip="Cerrando sesión" size="large" />
                </div>
    )

}

export default Logout