import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

import RowsComp from './RowsComp';
import { Empty } from 'antd';

const TableComp = ( { data, titles, haveId, widths, events } ) => {
    return (
    data.length == 0
        ?   <Empty description={ <h5>Sin datos</h5> } />
        :   <TableContainer component={Paper} >
                <Table /* sx={{ minWidth: 700 }} */ aria-label="customized table" >
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
                            data.map( (row) => (
                                <RowsComp key={row.id} row={row} haveId={haveId} events={events} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
    )
    

    

}

export default TableComp