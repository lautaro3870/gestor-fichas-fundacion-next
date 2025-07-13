'use client';
import CustomTable from '../components/CustomTable';
import NavigationBar from '../components/NavigationBar';
import { Column } from '@/lib/interfaces';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomInput from '../components/CustomInput';
import AreaHook from './hooks/AreaHook';

export default function Areas() {
  const {
    area,
    areas,
    handleChange,
    handleCreateArea,
    handleDeleteArea,
    handleEditArea,
    errorInput,
    loading,
  } = AreaHook();

  const columns: Column[] = [
    {
      field: 'area',
      headerName: 'Área',
      type: 'string',
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      type: 'string',
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleEditArea(params.row.id)}>
              <EditIcon />
            </Button>
            <Button
              onClick={() => handleDeleteArea(params.row.id)}
              variant="contained"
              color="error"
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <nav>
        <NavigationBar />
      </nav>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomInput
          label="Área"
          value={area}
          handleClick={handleCreateArea}
          error={errorInput}
          handleChange={(e) => handleChange(e)}
        />
        <CustomTable data={areas || []} columns={columns} cargando={loading} />
      </main>
    </>
  );
}
