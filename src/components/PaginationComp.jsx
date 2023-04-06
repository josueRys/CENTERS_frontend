import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const PaginationComp = (props) => {
    const { totalItems, onChange, current, defaultPageSize } = props;

    return (
        <div className='d-flex justify-content-center' style={{ backgroundColor: '#fff' }}>
            <Pagination
                total={totalItems || 0}
                showTotal={total => `Total ${total} elementos`}
                defaultPageSize={defaultPageSize || 10}
                pageSizeOptions={['10'/* , '25', '35' */]}
                defaultCurrent={1}
                current={current}
                onChange={onChange}
            />
        </div>
    );
}

PaginationComp.propTypes = {
    totalItems: PropTypes.number.isRequired,        // Total de registros
    onChange: PropTypes.func.isRequired,            // Eventos onChange(page, pageSize)
    current: PropTypes.number.isRequired,           // Página actual
    defaultPageSize: PropTypes.number               // Número de registros que obtiene por default
}

export default PaginationComp;