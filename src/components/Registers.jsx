import { useState } from "react"
import FlexButton from "./FlexButton"
import ModalComp from "./ModalComp";
import FormRegister from "./FormRegister";

const Registers = () => {

    const [ show, setShow ] = useState(false)

    const handleShowModal = () => setShow(true)
    const handleClose = () => {
        setShow(false)
    }

    return (
        <div>
            {
                <FlexButton titleTip= 'Nuevo Registro' tooltipPosition = 'left' onClick={handleShowModal} style={{ bottom: 20, right: 20 }} />
            }
            {
                show && <ModalComp
                            title="Nuevo Registro"
                            size='hr'
                            onClose={handleClose}
                            body={ <FormRegister handleClose={handleClose} /> }
                        />
            }
        </div>
    )
}

export default Registers