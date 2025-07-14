'use client';
import { FilterInterface } from '@/lib/interfaces';
import { GET_PROJECTS_FILTERED } from '@/lib/schemas';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ProyectosHook() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState<FilterInterface | null>(null);

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_PROJECTS_FILTERED, {
    variables: {
      filterProject: {
        departamento: null,
        anioFinalizacion: null,
        anioInicio: null,
        areas: null,
        pais: null,
        titulo: null,
        link: null,
        pdf: null,
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

  return { projects, filter, setFilter };
}
