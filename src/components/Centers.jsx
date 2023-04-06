
import { useEffect } from "react";
import { useState } from "react";
import { deleteCenter, readCenter, readCenters } from "../api/center.js";
import TableComp from "./TableComp.jsx";
import FlexButton from "./FlexButton";
import FormCenter from "./FormCenter";
import ModalComp from "./ModalComp";
import PaginationComp from "./PaginationComp.jsx";
import SkeletonComp from "./SkeletonComp.jsx";
import { MdDelete, MdRemoveRedEye, MdSystemUpdate } from "react-icons/md";

const Centers = () => {
    const [ show, setShow ] = useState(false)
    const [ show2, setShow2 ] = useState(false)
    const [ centers, setCenters ] = useState(null)
    const [ reload, setReload ] = useState(1)
    const [ totalItems, setTotalItems ] = useState(0)
    const [ current, setCurrent ] = useState(1)
    const [ update, setUpdate ] = useState(null)

    const handleShowModal = () => setShow(true)
    const handleClose = () => {
        setShow(false)
        setShow2(false)
    }    

    useEffect(() => {
        getData()
    },[reload,current])

    const getData = async () => {
        const { data } = await readCenters(current)
        let {totalCount} = data
        setTotalItems(totalCount)
        setCenters( data.data )
    }

    const handleDelete = async (row) => {
        // console.log('elimininando: '+row)
        let res = window.confirm('¿Seguro que quieres eliminar el elemento?')

        if (res === true){
            await deleteCenter(row)
            setReload(reload+1)
        }
    }

    const handleUpdate = async (row) => {
        let { data } = await readCenter(row)
        setUpdate(data)
        setShow2(true)
    }

    const handleView= (row) => {
        console.log('Viendo: '+row)
    }

    const events = [ { icon: <MdDelete style={{ width:'100%', height:'auto' }} />, variant:'danger', onclick: handleDelete, tooltip:[ 'Eliminar','left' ] }, 
                     { icon: <MdSystemUpdate style={{ width:'100%', height:'auto' }} />, variant:'success', onclick: handleUpdate, tooltip:[ 'Actualizar','top' ] }, 
                    /*  { icon: <MdRemoveRedEye style={{ width:'100%', height:'auto' }} />, variant:'primary', onclick: handleView, tooltip:[ 'Ver','right' ] } */ ]
    
    const titles = [ 'Nombre', 'Coordenadas','Dirección' , 'Teléfono', 'Eventos' ]

    const widths = [ '17%','25%','27%','15%','15%' ]

    return (
        <div className="py-3 ">
            {/* <h1>Centros</h1> */}
            <FlexButton titleTip= 'Nuevo Centro' tooltipPosition = 'left' onClick={handleShowModal} style={{ bottom: 20, right: 20 }} />
            {
                show && <ModalComp
                    body = { <FormCenter setReload={setReload} reload={reload} handleClose={handleClose}  /> }
                    onClose = { handleClose }
                    title = 'Nuevo Centro'
                    size = 'lg'
                />
            }
            {
                show2 && <ModalComp
                    body = { <FormCenter setReload={setReload} reload={reload} handleClose={handleClose} update={update}  /> }
                    onClose = { handleClose }
                    title = 'Editar Centro'
                    size = 'lg'
                />
            }
            {
                centers 
                    ? <TableComp events={events} data={centers} titles={titles} haveId={true} widths = { widths } /> 
                    : <SkeletonComp />
            }
            {
                totalItems != 0 && <PaginationComp totalItems={ totalItems } onChange={ (current) => { setCurrent(current) } } current={current} />
            }
        </div>
    )
}

export default Centers