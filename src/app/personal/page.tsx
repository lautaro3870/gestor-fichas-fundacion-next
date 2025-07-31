'use client';
import { Column } from '@/lib/interfaces';
import CustomInput from '../components/CustomInput';
import NavigationBar from '../components/NavigationBar';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomTable from '../components/CustomTable';
import PersonalHook from './hooks/PersonalHook';

export default function Personal() {
  const {
    personal,
    handleCreatePersonal,
    errorInput,
    handleChange,
    loading,
    handleEditPersonal,
    handleDeletePersonal,
    handleSearch,
    personalesFiltrados,
  } = PersonalHook();

  const columns: Column[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      type: 'string',
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      type: 'string',
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleEditPersonal(params.row.id)}>
              <EditIcon />
            </Button>
            <Button
              onClick={() => handleDeletePersonal(params.row.id)}
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
          label="Personal"
          value={personal}
          handleClick={handleCreatePersonal}
          error={errorInput}
          handleChange={(e) => handleChange(e)}
        />
        <div>
          <TextField
            sx={{ marginLeft: '43rem', top: '2.5rem' }}
            size="small"
            placeholder="Buscar"
            onChange={(e) => handleSearch(e)}
          />
          <CustomTable
            data={personalesFiltrados || []}
            columns={columns}
            loading={loading}
            marginTop='4rem'
          />
        </div>
      </main>
    </>
  );
}
