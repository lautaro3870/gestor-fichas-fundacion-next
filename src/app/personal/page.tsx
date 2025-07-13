'use client';
import { Column, ErrorInput, PersonalInterface } from '@/lib/interfaces';
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
  const [errorInput, setErrorInput] = useState<ErrorInput>({
    errorInput: false,
    errorMessage: '',
  });
  const { data, loading, error } = useQuery(GET_PERSONALES);
  const [deletePersonal] = useMutation(DELETE_PERSONAL);
  const [updatePersonalMutation] = useMutation(UPDATE_PERSONAL);
  const [createPersonal] = useMutation(CREATE_PERSONAL);
  const [getPersonal] = useLazyQuery(GET_PERSONAL);
  const router = useRouter();

  const validateIfPersonalExists = (value: string) => {
    const normalizeString = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    return personales?.some(
      (p: PersonalInterface) =>
        normalizeString(p.nombre) === normalizeString(value)
    );
  };

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
        if (validateIfPersonalExists(e)) {
          Swal.showValidationMessage('El personal está duplicado');
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
      setErrorInput({
        errorInput: true,
        errorMessage: '',
      });
      return;
    }
    try {
      if (validateIfPersonalExists(personal)) {
        setErrorInput({
          errorInput: true,
          errorMessage: 'Personal duplicado',
        });
        return;
      }
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
      setErrorInput({
        errorInput: true,
        errorMessage: '',
      });
    }
  };

  const handleChange = (value: any) => {
    setPersonal(value.target.value);
    setErrorInput({
      errorInput: false,
      errorMessage: '',
    });
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
          handleClick={handleCreatePersonal}
          error={errorInput}
          handleChange={(e) => handleChange(e)}
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
