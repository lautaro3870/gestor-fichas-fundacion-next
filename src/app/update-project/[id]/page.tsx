'use client';
import { useQuery } from '@apollo/client';
import CustomForm from '../../components/CustomForm';
import NavigationBar from '../../components/NavigationBar';
import { GET_ONE_PROJECT } from '@/lib/schemas';
import { useEffect, useState } from 'react';
import { CreateOrUpdateProject, Project } from '@/lib/interfaces';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import ProyectosHook from '@/app/proyectos/hooks/ProyectosHook';

export default function UpdateProject({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project>({
    id: 0,
    titulo: '',
    paisRegion: '',
    anioInicio: 0,
    anioFinalizacion: 0,
    montoContrato: '',
    moneda: '',
    areasxProyecto: [],
    departamento: '',
    contratante: '',
    direccion: '',
    numeroContrato: '',
    mesInicio: 0,
    mesFinalizacion: 0,
    consultoresAsociados: '',
    descripcion: '',
    resultados: '',
    fichaLista: false,
    enCurso: false,
    certConformidad: false,
    certificadoPor: 0,
    activo: false,
    link: '',
    convenio: false,
    pdf: '',
    issn: '',
    isbn: '',
    cita: '',
    revista: '',
    equipoxProyecto: [],
  });

  const { areasMapped, updateProject } = ProyectosHook();

  const router = useRouter();

  const { data, loading, error } = useQuery(GET_ONE_PROJECT, {
    variables: {
      findOneProjectId: +params.id,
    },
  });

  const handleFormData = (formData: CreateOrUpdateProject) => {
    const finalFormData = {
      ...formData,
      id: parseInt(params.id)
    };
    delete finalFormData.activo;
    delete finalFormData['__typename'];

    updateProject({ ...finalFormData, id: parseInt(params.id) })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado',
        });
      })
      .catch((error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al insertar el proyecto',
        });
      });
  };

  useEffect(() => {
    if (error?.message === 'Unauthorized') {
      Swal.fire({
        icon: 'info',
        title: 'Sesión expirada',
      });
      router.push('/login');
    } else {
      setProject(loading ? {} : data.findOneProject);
    }
  }, [loading, data, error]);

  // ver de hacer el mapeo de area y personal aca
  return (
    <>
      <nav>
        <NavigationBar />
      </nav>
      <main
        style={
          loading
            ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }
            : {}
        }
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <CustomForm
            project={project}
            areas={project?.areasxProyecto}
            personal={project?.equipoxProyecto}
            areasSelect={areasMapped}
            handleFormData={handleFormData}
          />
        )}
      </main>
    </>
  );
}
