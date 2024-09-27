import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function EmployeeTable(props) {
  const { EmployeeList } = props;

  // Ensure EmployeeList is not empty before mapping keys
  const keys = EmployeeList.length > 0 ? Object.keys(EmployeeList[0]) : [];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* Map through the keys and create table headers */}
            {keys.map((key) => (
              <TableCell sx={{fontWeight:"bold"}} key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map through EmployeeList to create table rows */}
          {EmployeeList.map((employee, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* For each key, create a table cell with corresponding data */}
              {keys.map((key) => (
                <TableCell key={key}>{employee[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
