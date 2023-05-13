import { Empty, Form, Input, Select } from "antd"
import { useEffect, useState } from "react"
import { readCenter, readCentersName } from "../api/center"
import { readUserName } from "../api/user"

const FormRol = ({ idCenter }) => {
    idCenter = parseInt(idCenter)
    
    const [ center, setCenter ] = useState(null)
    const [ users, setUsers ] = useState(null)

    useEffect(() => {
        getCenter()
        getUsers()
    },[])

    const getCenter = async () => {
        let center = []
        const res = await readCenter(idCenter)
        if(res.status === 200){
            const { data } = res
            const { name } = data
            const { id } = data
            center = [
                {
                    value: id,
                    label: name,
                    key: id
                }
            ]
        }
        setCenter(center)
    }

    const getUsers = async () => {
        let users = []
        const res = await readUserName(idCenter)
        if ( res.status === 200 ){
            const { data } = res
            data.map( (user) => {
                users = [ ...users, {
                    label: user.username,
                    value: user.id,
                    key: user.id
                } ]
            } )
        }
        setUsers(users)
        console.log(users)
    }

    return (
        <Form >
            <Form.Item initialValue={idCenter} label='Centro' name='Centro' rules={[ { required: true, message: 'Selecciona un Centro!', }, ]} >
                <Select
                    placeholder="Buscar Centro"
                    filterOption={ ( input, option ) => ( option?.label ?? '' ).toLowerCase().includes(input.toLowerCase()) }
                    options={center}
                    disabled
                />
            </Form.Item>

            <Form.Item label='Administrador' name='admin' rules={[ { required: true, message: 'Selecciona un Usuario!', }, ]} >
                <Select
                    showSearch
                    mode="multiple"
                    filterOption={ ( input, option ) => ( option?.label ?? '' ).toLowerCase().includes(input.toLowerCase()) }
                    notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    placeholder='Buscar Usuario'
                    options={users}
                />
            </Form.Item>

            <Form.Item label='Clientes' name='client' rules={[ { required: true, message: 'Selecciona un Usuario' } ]} >
                <Select/>
            </Form.Item>
        </Form>
    )
}

export default FormRol