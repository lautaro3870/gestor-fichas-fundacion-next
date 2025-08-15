'use client';
import { CreateOrUpdateProject, Project } from '@/lib/interfaces';
import CustomForm from '../components/CustomForm';
import NavigationBar from '../components/NavigationBar';
import Swal from 'sweetalert2';
import { useAppContext } from '@/context';
import MutationsProjectHook from '@/hooks/MutationsProjectHook';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProject() {
  const { areasMapped, personalesMapped } = useAppContext();
  const { createProject } = MutationsProjectHook();
  const router = useRouter();

  const handleFormData = (formData: CreateOrUpdateProject) => {
    createProject(formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto creado',
        });
      })
      .catch((error: any) => {
        if (error.cause.message === 'Unauthorized') {
          Swal.fire({
            icon: 'info',
            title: 'Sesión expirada',
          }).then(() => router.push('/login'));
          return;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al insertar el proyecto',
          });
        }
      });
  };

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'info',
        title: 'Sesión expirada',
      }).then(() => router.push('/login'));
      return;
    }
  }, []);

  return (
    <>
      <nav>
        <NavigationBar />
      </nav>
      <main>
        <CustomForm
          project={{} as Project}
          areas={[]}
          personal={[]}
          areasSelect={areasMapped}
          personalesSelect={personalesMapped}
          handleFormData={handleFormData}
        />
      </main>
    </>
  );
}
