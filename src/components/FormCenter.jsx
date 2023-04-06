import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { createCenter, updateCenter } from '../api/center.js';

const FormCenter = ({ handleClose, setReload, reload, update = null }) => {


    // let {name, phone_number, address, coordinate} = update
    // if (update){
    // }

    const [ form, setForm ] = useState({
        name: update?.name ||'',
        phone_number: update?.phone_number || '',
        address : update?.address ||'',
        coordinate: update?.coordinate ||''
    })

    const handleChange = ({target}) => {
        const {name, value} = target;

        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async () =>{
        if (update){
            const res = await updateCenter(update.id,form)
            if(res === 200) {
                handleClose()
                setReload(reload+1)
            }
        } else {
            const res = await createCenter(form)
            if(res === 200) {
                handleClose()
                setReload(reload+1)
            }
        }
    }

    return (
        <>
            <Form.Group>
                <Row>
                    <Col>
                        <div className="mb-3">
                            <label className="form-label">Nombre del centro</label>
                            <input
                                type="text"
                                className="form-control"
                                name='name'
                                onChange={handleChange}
                                value={form.name }
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Número telefónico</label>
                            <input
                                type="text"
                                className="form-control"
                                name='phone_number'
                                onChange={handleChange}
                                value={form.phone_number }
                            />
                        </div>                
                    </Col>
                    <Col>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input
                                type="text"
                                className="form-control"
                                name='address'
                                onChange={handleChange}
                                value={form.address }
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Coordenadas</label>
                            <input
                                type="text"
                                className="form-control"
                                name='coordinate'
                                onChange={handleChange}
                                value={form.coordinate }
                            />
                        </div>
                    </Col>
                </Row>

                <button type="submit" onClick={handleSubmit} className={`btn btn-${update ? 'success' : 'primary'} d-block mx-auto `}> { update ? 'Actualizar' : 'Guardar' } </button>
            </Form.Group>
        </>
    );
};
export default FormCenter;
