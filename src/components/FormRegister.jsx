import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Empty, Form, Input, Row, Select, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, readUserName, updateUser } from '../api/user';
import { useEffect, useState } from 'react';
import { readCentersName } from '../api/center';

const FormRegister = ( {handleClose} ) => {

    const [ centers, setCenters ] = useState([])
    const [ users, setUsers ] = useState([])

    const [ userSelect, setUserSelect ] = useState(undefined)

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

    const onChangeCenter = async (value) => {
        console.log(`selected center ${value}`)
        await getUsers(value)
        setUserSelect(undefined)
    };

    const onChangeUser = (value) => {
        console.log(`selected user ${value}`)
        setUserSelect(value)
    }

    const onFinish = async values => {
        console.log(values)
        handleClose()
    };

    const fields = [ 
        {
            name: ['user'],
            value: userSelect,
        },
    ]

    return (
            
        <Form fields={fields} onFinish={onFinish} >

            <Space.Compact block >
                <Col span={7} >
                    <Form.Item name="center" rules={[ { required: true, message: 'Selecciona un Centro!', }, ]} >
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
                <Col span={7} >
                    <Form.Item name="user" rules={[ { required: true, message: 'Selecciona un Usuario!', }, ]} >
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
                <Col span={7} >
                    <Form.Item name="computer" rules={[ { required: true, message: 'Selecciona un Equipo!', }, ]} >
                        <Select
                            showSearch
                            notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            placeholder="Equipo"
                            optionFilterProp="children"
                            // onChange={onChange}
                            filterOption={ ( input, option ) => ( option?.label ?? '' ).toLowerCase().includes(input.toLowerCase()) }
                            options={[]}
                        />
                    </Form.Item>
                </Col>
                <Col span={3} >
                    <Form.Item>
                        <Button type='primary' htmlType="submit" className="login-form-button btn-success" style={{ width:'100%' }} >Registrar</Button>
                    </Form.Item>
                </Col>               
            </Space.Compact>

        </Form>
  );
};
export default FormRegister;