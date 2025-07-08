'use client';
import { useEffect, useState } from 'react';
import CustomTable from '../components/CustomTable';
import NavigationBar from '../components/NavigationBar';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  CREATE_AREA,
  DELETE_AREA,
  GET_AREA,
  GET_AREAS,
  UPDATE_AREA,
} from '@/lib/schemas';
import { Area, Column } from '@/lib/interfaces';
import { Button, Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import CustomInput from '../components/CustomInput';

export default function Areas() {
  const columns: Column[] = [
    {
      field: 'area',
      headerName: 'Area',
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

  const [areas, setAreas] = useState<Area[]>();
  const [area, setArea] = useState('');
  const [errorInput, setErrorInput] = useState(false);
  const { data, loading, error } = useQuery(GET_AREAS);
  const [deleteArea] = useMutation(DELETE_AREA);
  const [updateAreaMutation] = useMutation(UPDATE_AREA);
  const [createArea] = useMutation(CREATE_AREA);
  const [getArea] = useLazyQuery(GET_AREA);
  const router = useRouter();

  const handleEditArea = async (id: number) => {
    const response = await getArea({ variables: { areaId: id } });
    const area = response.data.area.area;

    Swal.fire({
      title: 'Editar area',
      input: 'text',
      inputValue: area,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      preConfirm: async (e) => {
        await updateAreaMutation({
          variables: {
            updateArea: {
              area: e,
              id: id,
            },
          },
        });
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
      console.error('Error al eliminar área:', err);
    }
  };

  const handleCreateArea = async () => {
    if (area === '') {
      setErrorInput(true);
      return;
    }
    try {
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
      setErrorInput(true);
    }
  };

  useEffect(() => {
    setAreas(data ? data.areas : []);
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
          label="Area"
          value={area}
          setValue={(e) => setArea(e.target.value)}
          handleClick={handleCreateArea}
          error={errorInput}
          setError={(e) => setErrorInput(e)}
        />
        <CustomTable data={areas || []} columns={columns} cargando={loading} />
      </main>
    </>
  );
}
