'use client';
import { useQuery } from '@apollo/client';
import CustomForm from '../../components/CustomForm';
import NavigationBar from '../../components/NavigationBar';
import { GET_ONE_PROJECT } from '@/lib/schemas';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/interfaces';
import { CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function UpdateProject({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_ONE_PROJECT, {
    variables: {
      findOneProjectId: +params.id,
    },
  });

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
          />
        )}
      </main>
    </>
  );
}
