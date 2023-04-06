import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, Tooltip } from 'antd';

import { MdDelete, MdRemoveRedEye, MdSystemUpdate } from "react-icons/md";
import { GrView } from "react-icons/gr";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const RowsComp = ( {row, haveId, events} ) => {
    let rowId = row.id
    row = Object.values(row)
    
    haveId && row.shift()

    return  (
        <StyledTableRow style={{ height:'30px' }} >
            {
              row.map((cell, index) => (
                <StyledTableCell key={ index } style={{ padding: '7px' }} > {cell} </StyledTableCell>
              ))
            }
            {
              <StyledTableCell style={{ padding: '5px 0', display:'flex' }} >
                  {
                      events.map(({variant, onclick, icon, tooltip},index) => (
                        <Tooltip title={tooltip[0]} placement={tooltip[1]} key={index} >
                          <button 
                              type="button"  
                              className={`d-flex btn btn-${variant} me-2`} 
                              style={{ minWidth: '28px', padding:'2px'}}
                              onClick={ () => onclick(rowId)}
                          > {icon} </button>
                        </Tooltip>
                      ))
                  }
              </StyledTableCell>
            }
        </StyledTableRow>)
}

export default RowsComp