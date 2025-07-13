'use client';
import { Area, ErrorInput } from '@/lib/interfaces';
import {
  CREATE_AREA,
  DELETE_AREA,
  GET_AREAS,
  UPDATE_AREA,
} from '@/lib/schemas';
import {  useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function AreaHook() {
  const [areas, setAreas] = useState<Area[]>();
  const [area, setArea] = useState('');
  const [errorInput, setErrorInput] = useState<ErrorInput>({
    errorInput: false,
    errorMessage: '',
  });
  const { data, loading, error } = useQuery(GET_AREAS);
  const [deleteArea] = useMutation(DELETE_AREA);
  const [updateAreaMutation] = useMutation(UPDATE_AREA);
  const [createArea] = useMutation(CREATE_AREA);
  const router = useRouter();

  const validateIfAreaExists = (value: string) => {
    const normalizeString = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    return areas?.some(
      (area) => normalizeString(area.area) === normalizeString(value)
    );
  };

  const handleEditArea = async (id: number) => {
    const { area } = data.getAreas.find((a: Area) => a.id === id);

    Swal.fire({
      title: 'Editar area',
      input: 'text',
      inputValue: area,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      preConfirm: async (e) => {
        if (!e) {
          Swal.showValidationMessage('El campo no puede estar vacío');
          return;
        }
        if (validateIfAreaExists(e)) {
          Swal.showValidationMessage('El área está duplicada');
          return;
        }
        const response = await updateAreaMutation({
          variables: {
            updateArea: {
              area: e,
              id: id,
            },
          },
        });
        setAreas(response.data.updateArea);
      },
    });
  };

  const handleDeleteArea = async (id: number) => {
    try {
      const response = await deleteArea({
        variables: {
          deleteAreaId: id,
        },
      });
      setAreas(response.data.deleteArea);
    } catch (err) {
      Swal.fire({
        icon: 'info',
        title: 'Error al eliminar el área',
      });
    }
  };

  const handleCreateArea = async () => {
    if (area === '') {
      setErrorInput({
        errorInput: true,
        errorMessage: '',
      });
      return;
    }
    try {
      if (validateIfAreaExists(area)) {
        setErrorInput({
          errorInput: true,
          errorMessage: 'Área duplicada',
        });
        return;
      }
      const response = await createArea({
        variables: {
          createArea: {
            area,
          },
        },
      });
      setAreas(response.data.createArea);
      setArea('');
    } catch {
      setErrorInput({
        errorInput: true,
        errorMessage: '',
      });
    }
  };

  const handleChange = (value: any) => {
    setArea(value.target.value);
    setErrorInput({
      errorInput: false,
      errorMessage: '',
    });
  };

  useEffect(() => {
    setAreas(data ? data.getAreas : []);
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
    area,
    areas,
    handleChange,
    handleCreateArea,
    handleDeleteArea,
    handleEditArea,
    errorInput,
    loading,
  };
}
