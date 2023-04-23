import { useEffect, useState } from "react"
import { deleteComputer, readComputer, readComputers } from "../api/computer"
import TableComp from "./TableComp"
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md"
import SkeletonComp from "./SkeletonComp"
import FlexButton from "./FlexButton"
import ModalComp from "./ModalComp"
import PaginationComp from "./PaginationComp"
import FormComputer from "./FormComputer"

const Computers = () => {
    const [ computers, setComputers ] = useState(null)
    const [ show, setShow ] = useState(false)
    const [ show2, setShow2 ] = useState(false)
    const [ current, setCurrent ] = useState(1)
    const [ totalItem, setTotalItem ] = useState(0)
    const [ reload, setReload ] = useState(1)
    const [ update, setUpdate ] = useState(null)

    const handleShowModal = () => setShow(true)
    const handleClose = () => {
        setShow(false)
        setShow2(false)
    }

    useEffect(() => {
        getData()
    },[current, reload])

    const getData = async () => {
        let res
        let data = []
        res = await readComputers(current)
        // console.log(res)

        if (res.status === 200){
            data = res.data.data
            setTotalItem(res.data.totalCount)
        }
        setComputers(data)
        // console.log(data)
    }

    const handleDelete = async(row) => {
        let res = window.confirm('¿Seguro que quieres eliminar el elemento?')
        if (res === true){
            await deleteComputer(row)
            setReload(reload+1)
        }
    }

    const handleUpdate = async (row) => {
        const res = await readComputer(row)
        setUpdate(res.data)
        setShow2(true)
    }

    const titles = ['Modelo', 'Compañía', 'Tipo', 'Eventos']
    const widths = ['25%', '25%', '25%', '25%']
    const events = [ { icon: <MdDelete style={{ width:'100%', height:'auto' }} />, variant:'danger', onclick: handleDelete, tooltip:[ 'Eliminar','left' ] }, 
                     { icon: <MdDriveFileRenameOutline style={{ width:'100%', height:'auto' }} />, variant:'success', onclick: handleUpdate, tooltip:[ 'Actualizar','top' ] }, 
                    /*  { icon: <MdRemoveRedEye style={{ width:'100%', height:'auto' }} />, variant:'primary', onclick: handleView, tooltip:[ 'Ver','right' ] } */ ] 
    

    return (
        <div>
            {
                computers
                    ? <TableComp data={computers} titles={titles} widths={widths} events={events} />
                    : <SkeletonComp />
            }
            {
                totalItem > 0 && <PaginationComp 
                                    totalItems={totalItem}
                                    current={current}
                                    onChange={(current) => setCurrent(current)}
                                />
            }
            {
                <FlexButton onClick={handleShowModal} style={{ bottom: 20, right: 20 }} />
            }
            {
                show && <ModalComp
                            onClose={handleClose}
                            title={'Registrar Computadora'}
                            body={ <FormComputer handleClose={handleClose} reload={reload} setReload={setReload} /> }
                        />
            }
            {
                show2 && <ModalComp
                            onClose={handleClose}
                            title={'Actualizar Computadora'}
                            body={ <FormComputer update={update} handleClose={handleClose} reload={reload} setReload={setReload} /> }
                />
            }
        </div>
    )
}

export default Computers