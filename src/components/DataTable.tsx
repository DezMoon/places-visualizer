import React, { useMemo } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination
} from '@mui/material';
import { Place, SortConfig } from '../types/types';

interface Column {
  id: keyof Place;
  label: string;
  numeric: boolean;
  width?: number;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', numeric: false, width: 200 },
  { id: 'city', label: 'City', numeric: false, width: 150 },
  { id: 'region', label: 'State', numeric: false, width: 100 },
  { id: 'postal_code', label: 'ZIP Code', numeric: true, width: 120 },
  { id: 'tenant_type', label: 'Business Type', numeric: false, width: 200 },
];

interface DataTableProps {
  data: Place[];
  sortConfig: SortConfig | null;
  onSort: (sortConfig: { key: keyof Place; direction: 'asc' | 'desc' }) => void;
}

export const DataTable = ({ data, sortConfig, onSort }: DataTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortConfig.direction === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [data, sortConfig]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (key: keyof Place) => {
    onSort({
      key,
      direction: sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '70vh' }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.numeric ? 'right' : 'left'}
                  style={{ width: column.width }}
                  sortDirection={sortConfig?.key === column.id ? sortConfig.direction : false}
                >
                  <TableSortLabel
                    active={sortConfig?.key === column.id}
                    direction={sortConfig?.key === column.id ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.pid || index}>
  {columns.map((column) => (
    <TableCell key={`${row.pid || index}-${column.id}`}> 

                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Items per page:"
        sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}
      />
    </Paper>
  );
};