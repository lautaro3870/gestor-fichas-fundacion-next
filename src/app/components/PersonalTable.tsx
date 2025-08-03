'use client';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { PersonalInterface } from '@/lib/interfaces';
import { useEffect, useState } from 'react';

type PersonalTableProps = {
  personal: PersonalInterface[] | undefined;
  onUpdatePersonalList: (PersonalInterface: any) => void;
};

export default function PersonalTable({
  personal,
  onUpdatePersonalList,
}: PersonalTableProps) {
  const [personalList, setPersonalList] = useState<
    PersonalInterface[] | undefined
  >([]);

  // useEffect(() => {
  //   setPersonalList(personal);
  // }, [personal]);

  const handleDeletePersonal = (id: number) => {
    const newList = personalList?.filter((p: any) => p.personal.id !== id);
    setPersonalList(newList);
    onUpdatePersonalList(newList);
  };

  const handleRowUpdate = (newRow: any, oldRow: any) => {
    const changedField =
      Object.keys(newRow).find((key) => newRow[key] !== oldRow[key]) || '';

    const changedValue = newRow[changedField];

    const newList = personalList?.map((p: any) => {
      if (p.personal.id === newRow.id) {
        return {
          ...p,
          [changedField]: changedValue,
        };
      } else {
        return p;
      }
    });
    setPersonalList(newList);
    onUpdatePersonalList(newList);
    return newRow;
  };

  useEffect(() => {
    setPersonalList(personal);
  }, [personal]);

  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      type: 'string',
      width: 250,
      editable: false,
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
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeletePersonal(params.row.id)}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = personalList?.map((p: any) => ({
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
      processRowUpdate={handleRowUpdate}
    />
  );
}
