import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { PersonalInterface } from '@/lib/interfaces';

type PersonalTableProps = {
  personal: PersonalInterface[] | undefined;
};

export default function PersonalTable({ personal }: PersonalTableProps) {
  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      type: 'string',
      width: 250,
      editable: true,
    },
    {
      field: 'consultorAsociado',
      headerName: 'Consultor Asociado',
      type: 'boolean',
      width: 150,
      editable: true,
    },
    {
      field: 'coordinador',
      headerName: 'Coordinador',
      type: 'boolean',
      width: 150,
      editable: true,
    },
    {
      field: 'investigador',
      headerName: 'Investigador',
      type: 'boolean',
      width: 150,
      editable: true,
    },
    {
      field: 'subCoordinador',
      headerName: 'Sub Coordinador',
      type: 'boolean',
      width: 150,
      editable: true,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      type: 'string',
      renderCell: (params) => {
        return (
          <div>
            <Button variant="contained" color="error">
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = personal?.map((p: any) => ({
    id: p.personal.id,
    nombre: p.personal.nombre,
    consultorAsociado: p.consultorAsociado,
    coordinador: p.coordinador,
    subCoordinador: p.subCoordinador,
    investigador: p.investigador,
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableRowSelectionOnClick
    />
  );
}
