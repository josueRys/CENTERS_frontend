import { useState } from "react"
import FlexButton from "./FlexButton"
import ModalComp from "./ModalComp"
import FormUser from "./FormUser"

const Users = () => {
    const [ show, setShow ] = useState(false)

    const handleShowModal = () => setShow(true)
    const handleClose = () => setShow(false)

    
    
    return (
        <div>
            {
                <FlexButton titleTip= 'Nuevo Usuario' tooltipPosition = 'left' onClick={handleShowModal} style={{ bottom: 20, right: 20 }} />
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