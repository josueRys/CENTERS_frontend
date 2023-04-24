import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Empty, Form, Input, Row, Select, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, readUserName, updateUser } from '../api/user';
import { useEffect, useState } from 'react';
import { readCentersName } from '../api/center';
import { readComputersName } from '../api/computer';
import { createRegister } from '../api/register';

const FormRegister = ( {handleClose, reload, setReload} ) => {

    const [ centers, setCenters ] = useState([])
    const [ users, setUsers ] = useState([])
    const [ computers, setComputers ] = useState([])

    const [ userSelect, setUserSelect ] = useState(undefined)
    const [ computerSelect, setComputerSelect ] = useState(undefined)

    useEffect(()=>{
        getCenters()
    },[])
    
    const getCenters = async () => {
        const res = await readCentersName()
        let centers = []
        if(res.status === 200){
            const data = res.data
            data.map(center => {
                centers = [...centers,{
                    value: center.id,
                    label: center.name,
                    key: center.id
                }]        
            })
        }
        setCenters(centers)
    }

    const getUsers = async (idCenter) => {
        const res = await readUserName(idCenter)
        let users = []
        if(res.status === 200){
            const data = res.data
            data.map(user => {
                users = [...users,{
                    value: user.id,
                    label: user.username,
                    key: user.id
                }]
            })
        }
        setUsers(users)
    }

    const getComputers = async (idCenter) => {
        const res = await readComputersName(idCenter)
        let computers = []
        if(res.status === 200){
            const data = res.data
            data.map(computer => {
                computers = [...computers,{
                    value: computer.id,
                    label: computer.model,
                    key: computer.id
                }]
            })
        }
        setComputers(computers)
    }

    const onChangeCenter = async (value) => {
        await getUsers(value)
        await getComputers(value)
        setUserSelect(undefined)
        setComputerSelect(undefined)
    };

    const onChangeUser = (value) => {
        setUserSelect(value)
    }

    const onChangeComputer = (value) => {
        setComputerSelect(value)
    }

    const onFinish = async values => {
        await createRegister(values)
        handleClose()
        setReload(reload+1)
    };

    const fields = [ 
        {
            name: ['id_user'],
            value: userSelect,
        },
        {
            name: ['id_computer'],
            value: computerSelect
        }
    ]

    return (
            
        <Form fields={fields} onFinish={onFinish} >
            <Col span={24} >
                <Form.Item name="id_center" rules={[ { required: true, message: 'Selecciona un Centro!', }, ]} >
                    <Select
                        showSearch
                        filterOption={ ( input, option ) => ( option?.label ?? '' ).toLowerCase().includes(input.toLowerCase()) }
                        notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        placeholder="Centro"
                        optionFilterProp="children"
                        onChange={onChangeCenter}
                        options={centers}
                    />
                </Form.Item>
            </Col>
            <Space.Compact block >
                <Col span={12} >
                    <Form.Item name="id_user" rules={[ { required: true, message: 'Selecciona un Usuario!', }, ]} >
                        <Select
                            showSearch
                            notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            placeholder="Usuario"
                            optionFilterProp="children"
                            onChange={onChangeUser}
                            filterOption={ ( input, option ) => ( option?.label ?? '' ).toLowerCase().includes(input.toLowerCase()) }
                            options={users}
                        />
                    </Form.Item>
                </Col>
                <Col span={12} >
                    <Form.Item name="id_computer" rules={[ { required: true, message: 'Selecciona un Equipo!', }, ]} >
                        <Select
                            showSearch
                            notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            placeholder="Equipo de cómputo"
                            optionFilterProp="children"
                            onChange={onChangeComputer}
                            filterOption={ ( input, option ) => ( option?.label ?? '' ).toLowerCase().includes(input.toLowerCase()) }
                            options={computers}
                        />
                    </Form.Item>
                </Col>
            </Space.Compact>
            <Col span={24} >
                <Form.Item>
                    <Button type='primary' htmlType="submit" className="login-form-button btn-success" style={{ width:'100%' }} >Registrar</Button>
                </Form.Item>
            </Col>
        </Form>
  );
};
export default FormRegister;