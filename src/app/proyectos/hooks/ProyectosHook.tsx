'use client';
import { Area, CustomSelectInterface, FilterInterface } from '@/lib/interfaces';
import { GET_AREAS, GET_PROJECTS_FILTERED } from '@/lib/schemas';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ProyectosHook() {
  const [projects, setProjects] = useState([]);
  const [areasMapped, setAreasMapped] = useState<CustomSelectInterface[]>([]);
  const [filter, setFilter] = useState<FilterInterface>({
    departamento: null,
    anioFinalizacion: null,
    anioInicio: null,
    areas: null,
    pais: null,
    titulo: null,
    link: null,
    pdf: null,
  });

  const router = useRouter();

  const departamentos: CustomSelectInterface[] = [
    {
      id: 'energia',
      value: 'Energía',
    },
    {
      id: 'made',
      value: 'MADE',
    },
    {
      id: 'asc',
      value: 'ASC',
    },
  ];

  const getProjectsFiltered = async (newFilter: FilterInterface) => {
    const response = await getProjects({
      variables: {
        filterProject: newFilter,
      },
    });
    setProjects(response.data.filterProjects);
  };

  const [
    getProjects,
    { loading: loadingProjects, error: errorProjects, data: dataProjects },
  ] = useLazyQuery(GET_PROJECTS_FILTERED);

  const { data: dataAreas, loading: loadingAreas } = useQuery(GET_AREAS);

  // revisar de cobtrolar cuando hay un error en el back
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const stored = window.localStorage.getItem('filter');
      if (stored) {
        try {
          const getProjectsFiltered = async () => {
            await getProjects({
              variables: {
                filterProject: JSON.parse(stored || '{}'),
              },
            });
          };
          getProjectsFiltered();
          setFilter(JSON.parse(stored || '{}'));
        } catch (error) {
          console.log(error);
        }
      } else {
        const getProjectsFiltered = async () => {
          await getProjects({
            variables: {
              filterProject: filter,
            },
          });
        };
        getProjectsFiltered();
      }
    }
  }, []);

  useEffect(() => {
    if (errorProjects?.cause?.message === 'Unauthorized') {
      Swal.fire({
        icon: 'info',
        title: 'Sesión expirada',
      }).then(() => router.push('/login'));
      return;
    }

    if (!loadingProjects && dataProjects?.filterProjects) {
      setProjects(dataProjects.filterProjects);
    }

    if (!loadingAreas && dataAreas?.getAreas) {
      const finalAreas: CustomSelectInterface[] = dataAreas?.getAreas.map(
        (a: any) => ({
          id: a.id,
          value: a.area,
        })
      );
      setAreasMapped(finalAreas);
    }
  }, [loadingProjects, errorProjects, dataProjects, loadingAreas, dataAreas]);

  return {
    projects,
    filter,
    setFilter,
    areasMapped,
    departamentos,
    getProjectsFiltered,
  };
}
