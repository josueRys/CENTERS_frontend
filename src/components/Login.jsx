import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { ChakraProvider } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/login';
import { useToast } from '@chakra-ui/react'

const Login = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const onFinish = async (values) => {


    const {status} = await login(values)


    if (status === 200){
      navigate('/centers')
    } else {
        toast({
          title: 'Error',
          description: "Usuario y/o contraseña incorrectos.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
    }


/*     console.log(status) */


  };
  return (
    <ChakraProvider >
      <div className='d-flex justify-content-center align-items-center my-5' >
        <Form name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={onFinish} style={{ maxWidth:'300px' }} >

            <Form.Item name="username" rules={[ { required: true, message: 'Ingresa tu nombre de Usuario!', }, ]} >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
            </Form.Item>

            <Form.Item name="password" rules={[ { required: true, message: 'Ingresa tu contraseña!', }, ]} >
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Contraseña" />
            </Form.Item>

            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Recuérdame</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="" style={{ float:'right' }} >Olvidé mi contraseña</a>
            </Form.Item> */}

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width:'100%' }} >Inicia sesión</Button> O <Link to='../computers' >Registrate ahora!</Link>
            </Form.Item>

        </Form>      
      </div>
    </ChakraProvider>
  );
};
export default Login;