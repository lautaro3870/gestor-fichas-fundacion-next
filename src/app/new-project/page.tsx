'use client';
import { CreateOrUpdateProject, Project } from '@/lib/interfaces';
import CustomForm from '../components/CustomForm';
import NavigationBar from '../components/NavigationBar';
import ProyectosHook from '../proyectos/hooks/ProyectosHook';
import Swal from 'sweetalert2';

export default function NewProject() {
  const { createProject, areasMapped, personalesMapped } = ProyectosHook();

  const handleFormData = (formData: CreateOrUpdateProject) => {
    createProject(formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto creado',
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error al insertar el proyecto',
        });
      });
  };
  
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
