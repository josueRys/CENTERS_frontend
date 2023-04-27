import { useEffect, useState } from "react"
import FlexButton from "./FlexButton"
import ModalComp from "./ModalComp";
import FormRegister from "./FormRegister";
import TableComp from "./TableComp";
import { finishRegister, readRegisters } from "../api/register";
import SkeletonComp from "./SkeletonComp";
import { MdDelete } from "react-icons/md";
import PaginationComp from "./PaginationComp";
import { Select } from "antd";

const Registers = () => {

    const [ show, setShow ] = useState(false)
    const [ registers, setRegisters ] = useState(null)
    const [ current, setCurrent ] = useState(1)
    const [ totalItems, setTotalItems ] = useState(0)
    const [ reload, setReload ] = useState(1)
    const [ status, setStatus ] = useState('Finalizado')

    useEffect(() => {
        getData()
    },[ current, reload ])

    const getData = async () => {
        const res = await readRegisters(current)
        let data = []
        if(res.status === 200){
            data = res.data.data
            setTotalItems(res.data.totalCount)
        }
        setRegisters(data)
    }

    const handleDelete = (row) => {
        console.log(row)
    }

    const onChangeStatus = async (value) => {
        let res = window.confirm('¿Seguro que quieres finalizar el registro?')
        if(res === true){
            setStatus('Finalizado')
            await finishRegister(value)
            setReload(reload+1)
        }
    }

    const handleShowModal = () => setShow(true)
    const handleClose = () => {
        setShow(false)
    }

    const titles = [ 'Fecha', 'Entrada', 'Salida', 'Computadora', 'Usuario', 'Centro', 'Status' ]
    const widths = [ '10%', '10%', '10%', 'auto', 'auto', '25%', '15%' ]
    const changeStatus = [{ onChangeStatus: onChangeStatus, value: status }]

    return (
        <div>
            <FlexButton titleTip= 'Nuevo Registro' tooltipPosition = 'left' onClick={handleShowModal} style={{ bottom: 20, right: 20 }} />
            {
                registers
                    ? <TableComp data={registers} titles={titles} widths={widths} changeStatus={changeStatus} />
                    : <SkeletonComp />
            }
            {
                show && <ModalComp
                            title="Nuevo Registro"
                            size='hr'
                            onClose={handleClose}
                            body={ <FormRegister reload={reload} setReload={setReload} handleClose={handleClose} /> }
                        />
            }
            {
                totalItems > 0 && <PaginationComp 
                                    current={current}
                                    totalItems={totalItems}
                                    onChange={ (current) => { setCurrent(current) } }
                            />
            }
        </div>
    )
}

export default Registers