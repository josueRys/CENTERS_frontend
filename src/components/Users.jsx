import { useEffect, useState } from "react"
import FlexButton from "./FlexButton"
import ModalComp from "./ModalComp"
import FormUser from "./FormUser"
import { readUsers } from "../api/user"
import TableComp from "./TableComp"
import SkeletonComp from "./SkeletonComp"
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md"
import PaginationComp from "./PaginationComp"

const Users = () => {
    const [ show, setShow ] = useState(false)
    const [ users, setUsers ] = useState(null)
    const [ current, setCurrent ] = useState(1)
    const [ totalItems, setTotalItems ] = useState(0)

    const handleShowModal = () => setShow(true)
    const handleClose = () => setShow(false)

    useEffect( () => {
        getData()
    }, [ current ] )

    const getData = async () =>{
        const res = await readUsers(current)
        setUsers(res.data.data)
        console.log(res.data.totalCount)
        setTotalItems(res.data.totalCount)
    }
    const handleDelete = (row) => {
        console.log(`Eliminando ${row}`)
    }

    const handleUpdate = (row) => {
        console.log(`Actualizando ${row}`)
    }

    const widths = [ 'auto', 'auto', 'auto' ]

    const titles = [ 'Usuario', 'Password', 'Telefono', 'Eventos' ]
    const events = [ { icon: <MdDelete style={{ width:'100%', height:'auto' }} />, variant:'danger', onclick: handleDelete, tooltip:[ 'Eliminar','left' ] }, 
                     { icon: <MdDriveFileRenameOutline style={{ width:'100%', height:'auto' }} />, variant:'success', onclick: handleUpdate, tooltip:[ 'Actualizar','top' ] }, 
                    /*  { icon: <MdRemoveRedEye style={{ width:'100%', height:'auto' }} />, variant:'primary', onclick: handleView, tooltip:[ 'Ver','right' ] } */ ] 
    
    return (
        <div>
            {
                <FlexButton titleTip= 'Nuevo Usuario' tooltipPosition = 'left' onClick={handleShowModal} style={{ bottom: 20, right: 20 }} />
            }
            {
                users 
                    ? <TableComp events={events} data={users} titles={titles} widths = { widths } /> 
                    : <SkeletonComp />
            }
            {
                <PaginationComp current={current}
                                totalItems={totalItems}
                                onChange={ (current) => { setCurrent(current) } }
                />
            }
            {
                show && <ModalComp
                            body = { <FormUser handleClose={handleClose}  /> }
                            onClose = { handleClose }
                            title = 'Nuevo Usuario'
                            size = 'md'
                        />
            }
        </div>
    )
}

export default Users