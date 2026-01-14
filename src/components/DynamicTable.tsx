import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Checkbox, IconButton 
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface Column<T> {
  key: keyof T | 'actions';
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  onActionClick?: (event: React.MouseEvent, item: T) => void;
  showCheckbox?: boolean;
}

export function DynamicTable<T extends { id: string | number }>({ 
  columns, 
  data, 
  onRowClick, 
  onActionClick,
  showCheckbox = true 
}: DynamicTableProps<T>) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', overflow: 'hidden' }}>
      <Table>
        <TableHead sx={{ bgcolor: "#F1F5F9" }}>
          <TableRow>
            {showCheckbox && <TableCell padding="checkbox"><Checkbox size="small" /></TableCell>}
            {columns.map((col) => (
              <TableCell key={col.key as string} sx={{ fontWeight: 'bold', color: '#64748B' }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow 
              key={item.id} 
              hover 
              onClick={() => onRowClick?.(item)}
              sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {showCheckbox && (
                <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                  <Checkbox size="small" />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={col.key as string}>
                  {col.key === 'actions' ? (
                    <IconButton size="small" onClick={(e) => {
                      e.stopPropagation();
                      onActionClick?.(e, item);
                    }}>
                      <MoreVertIcon />
                    </IconButton>
                  ) : col.render ? (
                    col.render(item[col.key as keyof T], item)
                  ) : (
                    String(item[col.key as keyof T])
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}