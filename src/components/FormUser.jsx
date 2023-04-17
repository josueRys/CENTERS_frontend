import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, updateUser } from '../api/user';
import { useState } from 'react';

const FormUser = ( {setReload, reload, handleClose, update = null} ) => {

    const onFinish = async values => {

        if (update){
            // console.log(values)    
            const res = await updateUser(update.id,values)
            console.log(res)
            handleClose()
        } else {
            // console.log(values)    
            const res = await createUser(values)
            console.log(res)
            handleClose()
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
        <Form fields={fields} /* name="normal_login" className="login-form" */ initialValues={{ remember: false, }} onFinish={onFinish} >

            <Form.Item name="username" rules={[ { required: true, message: 'Ingresa el nombre del Usuario!', }, ]} >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" type='text' />
            </Form.Item>

            <Form.Item name="password" rules={[ { required: true, message: 'Ingresa tu contraseña!', }, ]} >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Contraseña" />
            </Form.Item>

            {/* <Form.Item name="passwordAgain" rules={[ { required: true, message: 'Ingresa la contraseña!', }, ]} >
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Ingrese nuevamente la Contraseña" />
            </Form.Item> */}

            <Form.Item name="phone_number" rules={[ { required: true, message: 'Ingresa el número!', }, ]} >
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} type="text" placeholder="Numero telefónico" />
            </Form.Item>
            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Recuérdame</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="" style={{ float:'right' }} >Olvidé mi contraseña</a>
            </Form.Item> */}

            <Form.Item>
                <Button type='primary' htmlType="submit" className="login-form-button btn-success" style={{ width:'100%' }} >{`${update ? 'Actualizar' : 'Registrar'}`}</Button>
                {/* <button type="submit" onClick={handleSubmit} className={`btn btn-${update ? 'success' : 'primary'} d-block mx-auto `}> { update ? 'Actualizar' : 'Guardar' } </button> */}
            </Form.Item>

        </Form>
  );
};
export default FormUser;