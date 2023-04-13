import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const FormUser = () => {

    const onFinish = async values => {
        console.log(values)    
      };

  return (
        <Form name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={onFinish} >

            <Form.Item name="username" rules={[ { required: true, message: 'Ingresa el nombre del Usuario!', }, ]} >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
            </Form.Item>

            <Form.Item name="password" rules={[ { required: true, message: 'Ingresa tu contraseña!', }, ]} >
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Contraseña" />
            </Form.Item>

            <Form.Item name="passwordAgain" rules={[ { required: true, message: 'Ingresa la contraseña!', }, ]} >
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Ingrese nuevamente la Contraseña" />
            </Form.Item>

            <Form.Item name="phone_number" rules={[ { required: true, message: 'Ingresa el número!', }, ]} >
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="text" placeholder="Numero telefónico" />
            </Form.Item>
            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Recuérdame</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="" style={{ float:'right' }} >Olvidé mi contraseña</a>
            </Form.Item> */}

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width:'100%' }} >Registrar</Button>
            </Form.Item>

        </Form>
  );
};
export default FormUser;