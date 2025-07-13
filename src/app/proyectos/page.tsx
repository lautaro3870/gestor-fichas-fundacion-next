'use client';

import { Box, Button } from '@mui/material';
import NavigationBar from '../components/NavigationBar';
import ProyectosHook from './hooks/ProyectosHook';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';

export default function Proyectos() {
  const { projects } = ProyectosHook();

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'titulo',
      headerName: 'Título',
      type: 'string',
      flex: 2,

      renderCell: (params) => (
        <Box
          sx={{
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            textAlign: 'left',
            width: '100%', // Que use todo el ancho disponible
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'paisRegion',
      headerName: 'País/región',
      type: 'string',
      flex: 1,
    },
    {
      field: 'anioInicio',
      headerName: 'Año inicio',
      type: 'number',
      flex: 1,
    },
    {
      field: 'anioFinalizacion',
      headerName: 'Año finalización',
      type: 'number',
      flex: 1,
    },
    {
      field: 'montoContrato',
      headerName: 'Monto',
      type: 'number',
      flex: 1,
    },
    {
      field: 'moneda',
      headerName: 'Moneda',
      type: 'string',
      flex: 1,
    },
    {
      field: 'areasxProyecto',
      headerName: 'Áreas',
      type: 'string',
      flex: 2,
      renderCell: (params) =>
        Array.isArray(params.value)
          ? params.value.map((a: any) => a.area.area).join(', ')
          : '',
    },
    {
      field: 'departamento',
      headerName: 'Departamento',
      type: 'string',
      flex: 1,
    },
    {
      field: 'contratante',
      headerName: 'Contratante',
      type: 'string',
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      type: 'string',
      flex: 1,
      renderCell: () => (
        <Box>
          <Button variant="contained" sx={{ marginBottom: '0.5rem' }}>
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ marginBottom: '0.5rem' }}
          >
            <DeleteIcon />
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{ marginBottom: '0.5rem' }}
          >
            <PrintIcon />
          </Button>
        </Box>
      ),
    },
  ];

  const rows = projects;

  return (
    <>
      <nav>
        <NavigationBar />
      </nav>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            height: '50rem',
            width: '90%',
            marginTop: '10rem',
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            getRowHeight={() => 'auto'}
            sx={{
              marginBottom: '3rem',
              '& .MuiDataGrid-cell': {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                display: 'flex',
                alignItems: 'center',
                minHeight: 64,
                py: 1,
              },
            }}
          />
        </Box>
      </main>
    </>
  );
}
