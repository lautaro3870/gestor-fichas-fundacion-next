'use client';
import { ErrorInput, PersonalInterface } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  CREATE_PERSONAL,
  DELETE_PERSONAL,
  GET_PERSONALES,
  UPDATE_PERSONAL,
} from '@/lib/schemas';
import Swal from 'sweetalert2';

export default function PersonalHook() {
  const [personales, setPersonales] = useState<PersonalInterface[]>();
  const [personalesFiltrados, setPersonalesFiltrados] =
    useState<PersonalInterface[]>();
  const [personal, setPersonal] = useState('');
  const [errorInput, setErrorInput] = useState<ErrorInput>({
    errorInput: false,
    errorMessage: '',
  });
  const { data, loading, error } = useQuery(GET_PERSONALES);
  const [deletePersonal] = useMutation(DELETE_PERSONAL);
  const [updatePersonalMutation] = useMutation(UPDATE_PERSONAL);
  const [createPersonal] = useMutation(CREATE_PERSONAL);
  const router = useRouter();

  const normalizeString = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const validateIfPersonalExists = (value: string) => {
    return personales?.some(
      (p: PersonalInterface) =>
        normalizeString(p.nombre) === normalizeString(value)
    );
  };

  const handleEditPersonal = async (id: number) => {
    const { nombre } = data.getPersonal.find(
      (p: PersonalInterface) => p.id === id
    );

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

  const handleSearch = (e: any) => {
    const { value } = e.target;
    
    if (value.trim() === '') {
      setPersonalesFiltrados(personales);
      return;
    }

    const newListPersonal = personales?.filter((p: PersonalInterface) =>
      normalizeString(p.nombre).includes(normalizeString(value))
    );

    setPersonalesFiltrados(newListPersonal);
  };

  useEffect(() => {
    setPersonales(data ? data.getPersonal : []);
    setPersonalesFiltrados(data ? data.getPersonal : []);
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

  return {
    personal,
    handleCreatePersonal,
    errorInput,
    handleChange,
    personales,
    loading,
    handleEditPersonal,
    handleDeletePersonal,
    handleSearch,
    personalesFiltrados
  };
}
