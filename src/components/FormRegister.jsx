import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Empty, Form, Input, Row, Select, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, updateUser } from '../api/user';
import { useState } from 'react';

const FormRegister = ( {handleClose} ) => {

    const onFinish = async values => {
        console.log(values)
        handleClose()
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    return (
            
        <Form onFinish={onFinish} >

            <Space.Compact block >
                <Col span={7} className="gutter-row" >
                    <Form.Item name="center" rules={[ { required: true, message: 'Selecciona un Centro!', }, ]} >
                        <Select
                            showSearch
                            notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            placeholder="Centro"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) => (
                                option?.label ?? '').toLowerCase().includes(input.toLowerCase()
                            )}
                            options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                            
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col span={7} className="gutter-row" >
                    <Form.Item name="user" rules={[ { required: true, message: 'Selecciona un Usuario!', }, ]} >
                        <Select
                            showSearch
                            notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            placeholder="Usuario"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) => (
                                option?.label ?? '').toLowerCase().includes(input.toLowerCase()
                            )}
                            options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                            
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col span={7} className="gutter-row">
                    <Form.Item name="computer" rules={[ { required: true, message: 'Selecciona un Equipo!', }, ]} >
                        <Select
                            showSearch
                            notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                            placeholder="Equipo"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) => (
                                option?.label ?? '').toLowerCase().includes(input.toLowerCase()
                            )}
                            options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                            
                            ]}
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