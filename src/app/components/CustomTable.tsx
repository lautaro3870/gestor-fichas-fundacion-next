import { Area, Column, PersonalInterface } from '@/lib/interfaces';
import { Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type CustomTableProps = {
  data: Area[] | PersonalInterface[];
  columns: Column[];
  loading: boolean;
  marginTop: string;
};

export default function CustomTable({
  data,
  columns,
  loading,
  marginTop,
}: CustomTableProps) {
  const dataGridColumns: GridColDef<(typeof rows)[number]>[] = columns.map(
    (column: Column) => ({
      field: column.field,
      headerName: column.headerName,
      type: 'string',
      width: column.field === 'acciones' ? 200 : 450,
      renderCell: column.renderCell,
    })
  );

  const rows = data.map((row) => {
    const rowData: Record<string, any> = {};
    columns.forEach((column) => {
      rowData[column.field] = row[column.field as keyof typeof row];
    });
    return {
      id: row?.id,
      ...rowData,
    };
  });

  return (
    <Box
      sx={{
        marginTop: marginTop,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          sx={{
            width: '100%',
          }}
          rows={rows}
          columns={dataGridColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
