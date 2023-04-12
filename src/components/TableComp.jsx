import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip } from 'antd';
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

import { Empty } from 'antd';

const TableComp = ( { data, titles, widths, events } ) => {
    return (
    data.length == 0
        ?   <Empty description={ <h5>Sin datos</h5> } />
        :   <TableContainer component={Paper} >
                <Table aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            {
                                titles.map( (title, index) => 
                                    <StyledTableCell key={title} style={{ width: `${widths[index]}` }} > {title} </StyledTableCell>
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map( (row) => {
                                let rowId = row.id
                                row = Object.values(row)
                                row.shift()

                                return (
                                    <StyledTableRow style={{ height:'30px' }} key={rowId} >
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
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
    )
    

    

}

export default TableComp