import { Button, Modal } from 'antd';
import { useState } from 'react';
const ModalComp = ( props ) => {

    const { 
        title,
        onClose,
        body,
        keyboard,
        maskClosable,
        size } = props

        

    return (
      <Modal
          title={title}
          width={size === 'hr' ? '55%' : '40%'}
          open={true}
          onOk={onClose}
          onCancel={onClose}
          footer={null}
          keyboard={keyboard || false}
          maskClosable = {maskClosable || false}
      >
          <div> {body} </div>
      </Modal>
    );
};
export default ModalComp;