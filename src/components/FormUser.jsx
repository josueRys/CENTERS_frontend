import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Empty, Form, Input, Select, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, updateUser } from '../api/user';
import { useEffect, useState } from 'react';
import { readCentersName } from '../api/center';

const FormUser = ( {setReload, reload, handleClose, update = null} ) => {

    const [ centers, setCenters ] = useState(null)

    useEffect(() => {
        getCenters()
    },[])

    const getCenters = async () => {
        let centers = []
        const res = await readCentersName()
        if(res.status === 200){
            const data = res.data
            data.map(center =>{
                centers = [...centers,{
                    label: center.name,
                    value: center.id,
                    key: center.id
                }]
            })

        }
        setCenters(centers)
    }

    const onFinish = async values => {

        if (update){
            // console.log(values)    
            const res = await updateUser(update.id,values)
            console.log(res)
            handleClose()
        } else {
            console.log(values)    
            // const res = await createUser(values)
            // console.log(res)
            // handleClose()
        }

        setReload(reload+1)
        
      };


    const fields = [ 
            {
                name: ['username'],
                value: update?.username || '',
            },
            {
                name: ['phone_number'],
                value: update?.phone_number || '',
            },
            {
                name: ['password'],
                value: update?.password || '',
            },
     ]

    return (
        <Form fields={fields} initialValues={{ remember: false, }} onFinish={onFinish} >

            <Form.Item label='Usuario' name="username" rules={[ { required: true, message: 'Ingresa el nombre del Usuario!', }, ]} >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" type='text' />
            </Form.Item>

            <Form.Item label='Contraseña' name="password" rules={[ { required: true, message: 'Ingresa tu contraseña!', }, ]} >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Contraseña" />
            </Form.Item>

            <Form.Item label='Teléfono' name="phone_number" rules={[ { required: true, message: 'Ingresa el número!', }, ]} >
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} type="text" placeholder="Numero telefónico" />
            </Form.Item>

            <Col span={24} >
                <Form.Item label='Centro' name='centers' >
                    <Select
                        showSearch
                        notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        optionFilterProp="children"
                        mode='multiple'
                        filterOption={ ( input, option ) => ( option?.label ?? '' ).toLowerCase().includes(input.toLowerCase()) }
                        placeholder='Buscar Centro'
                        options={centers}
                    />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item label='Rol' name='rol' initialValue='client' >
                    <Select
                        showSearch
                        disabled
                        notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        optionFilterProp="children"
                        filterOption={ ( input, option ) => ( option?.label ?? '' ).toLowerCase().includes(input.toLowerCase()) }
                        placeholder='Rol'
                        options={[
                            {
                                label: 'Administrador',
                                value: 'admin'
                            },
                            {
                                label: 'Cliente',
                                value: 'client'
                            }
                        ]}
                    />
                </Form.Item>
            </Col>
            <Form.Item>
                <Button type='primary' htmlType="submit" className="login-form-button btn-success" style={{ width:'100%' }} >{`${update ? 'Actualizar' : 'Registrar'}`}</Button>
            </Form.Item>

        </Form>
  );
};
export default FormUser;