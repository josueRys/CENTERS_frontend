import { BarcodeOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Empty, Form, Input, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, updateUser } from '../api/user';
import { useEffect, useState } from 'react';
import { MdComputer } from 'react-icons/md';
import { BsFillBuildingFill } from 'react-icons/bs';
import { FaAd, FaDesktop, FaLaptopHouse } from 'react-icons/fa';
import { readCentersName } from "../api/center";
import { createComputers, updateComputer } from '../api/computer';

const FormComputer = ({ handleClose, reload, setReload, update = null }) => {

    const [ centers, setCenters ] = useState(null)

    useEffect(() => {
        getCenters()
    },[])

    const getCenters = async () => {
        let opcion = []
        const res = await readCentersName()
        if (res.status === 200){
            const data = res.data
            data.map(center => {
                opcion = [ ...opcion,{
                    label:center.name,
                    value:center.id,
                    key:center.id
                } ]
            })
        }
        setCenters(opcion)
    }

    const onFinish = async values => {
        if(update){
            await updateComputer(update.id,values)
        } else {
            await createComputers(values)
        }
        handleClose()  
        setReload(reload+1)      
    };

    const fields = [
        {
            name: ['model'],
            value: update?.model || ''
        },
        {
            name: ['company'],
            value: update?.company || ''
        },
        {
            name: ['type'],
            value: update?.type || ''
        },
        {
            name : ['id_center'],
            value: update?.id_center || undefined
        }
    ]

    return (
        <Form fields={fields} initialValues={{ remember: false, }} onFinish={onFinish} >

            <Form.Item name="model" rules={[ { required: true, message: 'Ingresa el Modelo!', }, ]} >
                <Input allowClear type='text' prefix={<BarcodeOutlined className="site-form-item-icon" />} placeholder="Modelo del Equipo" />
            </Form.Item>

            <Form.Item name="company" rules={[ { required: true, message: 'Ingresa la Compañía!', }, ]} >
                <Input allowClear type="text" prefix={<FaLaptopHouse className="site-form-item-icon" />}  placeholder="Compañía del Equipo"  />
            </Form.Item>

            <Form.Item name="type" rules={[ { required: true, message: 'Ingresa el tipo de computo!', }, ]} >
                <Input allowClear type="text" prefix={<FaDesktop className="site-form-item-icon" />}  placeholder="Tipo de Equipo"  />
            </Form.Item>

            <Form.Item name="id_center" rules={[ { required: true, message: 'Ingresa el Centro!', }, ]} >
                <Select
                    showSearch
                    notFoundContent={ <Empty description={ <span>Sin datos</span> } image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    placeholder="Centro al que pertenece el Equipo"
                    optionFilterProp="children"
                    filterOption={ ( input, option ) => ( option?.label ?? '' ).toLowerCase().includes(input.toLowerCase()) }
                    options={centers}
               />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType="submit" className="login-form-button btn-success" style={{ width:'100%' }} > {`${update ? 'Actualizar' : 'Registrar'}`} </Button>
            </Form.Item>

        </Form>
  );
};
export default FormComputer;