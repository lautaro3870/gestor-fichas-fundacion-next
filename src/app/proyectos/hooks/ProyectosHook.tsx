'use client';
import { GET_PROJECTS_FILTERED } from '@/lib/schemas';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ProyectosHook() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_PROJECTS_FILTERED, {
    variables: {
      filterProject: {
        departamento: null,
        anioFinalizacion: null,
        anioInicio: null,
        areas: null,
        pais: null,
        personal: null,
        titulo: null,
      },
    },
  });

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (error && error.cause?.message === 'Unauthorized') {
      Swal.fire({
        icon: 'info',
        title: 'Sesión expirada',
      });
      router.push('/login');
    } else {
      if (!loading) {
        setProjects(data.filterProjects);
      }
    }
  }, [loading]);

  return { projects };
}
