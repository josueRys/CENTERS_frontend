import { useEffect, useState } from "react"
import FlexButton from "./FlexButton"
import ModalComp from "./ModalComp"
import FormUser from "./FormUser"
import { deleteUser, readUser, readUsers } from "../api/user"
import TableComp from "./TableComp"
import SkeletonComp from "./SkeletonComp"
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md"
import PaginationComp from "./PaginationComp"
import { BsFillBuildingFill } from "react-icons/bs"
import { FaEye } from "react-icons/fa"

const Users = ( {idCenter = null} ) => {
    const [ show, setShow ] = useState(false)
    const [ show2, setShow2 ] = useState(false)
    const [ users, setUsers ] = useState(null)
    const [ current, setCurrent ] = useState(1)
    const [ totalItems, setTotalItems ] = useState(0)
    const [ update, setUpdate ] = useState(null)
    const [ reload, setReload ] = useState(1)

    const handleShowModal = () => setShow(true)
    const handleClose = () => {
        setShow(false)
        setShow2(false)
    }

    useEffect( () => {
        getData()
    }, [ current, reload ] )

    const getData = async () =>{
        const res = await readUsers(current,idCenter)
        if(res.status === 200){
            const { data } = res
            let {totalCount} = data
            setTotalItems(totalCount)
            setUsers( data.data )
        } else {
            setUsers([])
            setTotalItems(0)
        }
    }
    const handleDelete = async (row) => {
        let res = window.confirm('¿Seguro que quieres eliminar el elemento?')

        if (res === true){
            await deleteUser(row)
            setReload(reload+1)
        }
    }

    const handleUpdate = async (row) => {
        const res = await readUser(row)
        setUpdate(res.data)
        setShow2(true)
    }

    const AssignCenter = (row) => {
        console.log(row)
    }

    const widths = [ '30%', '30%', '25%','15%' ]

    const titles = [ 'Usuario', 'Password', 'Telefono', 'Eventos' ]
    const events = [ { icon: <MdDelete style={{ width:'100%', height:'auto' }} />, variant:'danger', onclick: handleDelete, tooltip:[ 'Eliminar','left' ] }, 
                     { icon: <MdDriveFileRenameOutline style={{ width:'100%', height:'auto' }} />, variant:'success', onclick: handleUpdate, tooltip:[ 'Actualizar','top' ] }, 
                     { icon: <FaEye style={{ width:'100%', height:'auto' }} />, variant:'primary', onclick: AssignCenter, tooltip:[ 'Asignar Centro','top' ] } ] 
    
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
                totalItems > 0 && <PaginationComp current={current}
                                totalItems={totalItems}
                                onChange={ (current) => { setCurrent(current) } }
                />
            }
            {
                show && <ModalComp
                            body = { <FormUser handleClose={handleClose} setReload={setReload} reload={reload}  /> }
                            onClose = { handleClose }
                            title = 'Nuevo Usuario'
                            size = 'md'
                        />
            }
            {
                show2 && <ModalComp
                            body = { <FormUser handleClose={handleClose} update={update} setReload={setReload} reload={reload}  /> }
                            onClose = { handleClose }
                            title = 'Actualizar Usuario'
                            size = 'md'
                        />
            }
        </div>
    )
}

export default Users