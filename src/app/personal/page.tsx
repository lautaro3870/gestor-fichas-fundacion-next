'use client';
import { Column, PersonalInterface } from '@/lib/interfaces';
import CustomInput from '../components/CustomInput';
import NavigationBar from '../components/NavigationBar';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  CREATE_PERSONAL,
  DELETE_PERSONAL,
  GET_PERSONAL,
  GET_PERSONALES,
  UPDATE_PERSONAL,
} from '@/lib/schemas';
import CustomTable from '../components/CustomTable';
import Swal from 'sweetalert2';

export default function Personal() {
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

  const [personales, setPersonales] = useState<PersonalInterface[]>();
  const [personal, setPersonal] = useState('');
  const [errorInput, setErrorInput] = useState(false);
  const { data, loading, error } = useQuery(GET_PERSONALES);
  const [deletePersonal] = useMutation(DELETE_PERSONAL);
  const [updatePersonalMutation] = useMutation(UPDATE_PERSONAL);
  const [createPersonal] = useMutation(CREATE_PERSONAL);
  const [getPersonal] = useLazyQuery(GET_PERSONAL);
  const router = useRouter();

  const handleEditPersonal = async (id: number) => {
    const response = await getPersonal({ variables: { getOnePersonalId: id } });
    const nombre = response.data.getOnePersonal.nombre;

    Swal.fire({
      title: 'Editar personal',
      input: 'text',
      inputValue: nombre,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      preConfirm: async (e) => {
        if (!e) {
          Swal.showValidationMessage('El campo no puede estar vacío');
          return;
        }
        const response = await updatePersonalMutation({
          variables: {
            updatePersonal: {
              nombre: e,
              foto: '',
              perfil: '',
              id: id,
            },
          },
        });
        setPersonales(response.data.updatePersonal);
      },
    });
  };

  const handleDeletePersonal = async (id: number) => {
    try {
      const response = await deletePersonal({
        variables: {
          deletePersonalId: id,
        },
      });
      setPersonales(response.data.deletePersonal);
    } catch (err) {
      Swal.fire({
        icon: 'info',
        title: 'Error al eliminar el personal',
      });
    }
  };

  const handleCreatePersonal = async () => {
    if (personal === '') {
      setErrorInput(true);
      return;
    }
    try {
      const response = await createPersonal({
        variables: {
          createPersonal: {
            nombre: personal,
            perfil: '',
            foto: '',
          },
        },
      });
      setPersonales(response.data.createPersonal);
      setPersonal('');
    } catch {
      setErrorInput(true);
    }
  };

  useEffect(() => {
    setPersonales(data ? data.getPersonal : []);
  }, [data]);

  useEffect(() => {
    if (error?.message === 'Unauthorized') {
      Swal.fire({
        icon: 'info',
        title: 'Sesión expirada',
      });
      router.push('/login');
    }
  }, [error]);

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
          setValue={(e) => setPersonal(e.target.value)}
          handleClick={handleCreatePersonal}
          error={errorInput}
          setError={(e) => setErrorInput(e)}
        />
        <CustomTable
          data={personales || []}
          columns={columns}
          cargando={loading}
        />
      </main>
    </>
  );
}
