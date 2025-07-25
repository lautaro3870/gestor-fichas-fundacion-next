'use client';
import {
  Area,
  CustomSelectInterface,
  FilterInterface,
  Project,
} from '@/lib/interfaces';
import {
  DELETE_PROJECT,
  GET_AREAS,
  GET_PROJECTS_FILTERED,
} from '@/lib/schemas';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
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

  const [deleteProject] = useMutation(DELETE_PROJECT);

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

  const handleDeleteProject = async (id: number) => {
    Swal.fire({
      icon: 'error',
      title: '¿Desea eliminar el proyecto?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteProject({
            variables: {
              deleteProjectId: id,
            },
          });
          Swal.fire('Eliminado', '', 'success');
          setProjects(response.data.deleteProject);
        }
      })
      .catch(() => {
        Swal.fire('Error al elimimar', '', 'error');
      });
  };

  const obtenerNombreConRoles = ({
    nombre,
    consultorAsociado,
    coordinador,
    investigador,
    subCoordinador,
  }: {
    nombre: string;
    consultorAsociado: boolean;
    coordinador: boolean;
    investigador: boolean;
    subCoordinador: boolean;
  }): string => {
    const roles: string[] = [];

    if (consultorAsociado) roles.push('Consultor Asociado')
    if (coordinador) roles.push('Coordinador');
    if (investigador) roles.push('Investigador');
    if (subCoordinador) roles.push('Subcoordinador');

    return `${nombre} - ${roles.join(', ')}`;
  };

  const printOneProject = async (id: number) => {
    const project: Project =
      projects.find((project: Project) => project.id === id) ??
      (() => {
        throw new Error(`Project with id ${id} not found`);
      })();

    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Información del Proyecto',
                    bold: true,
                    size: 36, // 16pt
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: {
                  after: 400,
                },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Título: ', bold: true, size: 28 }),
                  new TextRun({ text: project.titulo, size: 26 }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Departamento: ', bold: true, size: 28 }),
                  new TextRun({ text: project.departamento, size: 26 }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Monto: ', bold: true, size: 28 }),
                  new TextRun({
                    text: `${project.montoContrato.toString()} - ${
                      project.moneda
                    }`,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Contratante: ', bold: true, size: 28 }),
                  new TextRun({ text: project.contratante, size: 26 }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Fecha inicio: ', bold: true, size: 28 }),
                  new TextRun({
                    text: `${project.mesInicio.toString()} - ${project.anioInicio.toString()}`,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Fecha fin: ', bold: true, size: 28 }),
                  new TextRun({
                    text: `${project.mesFinalizacion.toString()} - ${project.anioFinalizacion.toString()}`,
                    size: 26,
                  }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'PDF: ', bold: true, size: 28 }),
                  new TextRun({ text: project.pdf, size: 26 }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Link: ', bold: true, size: 28 }),
                  new TextRun({ text: project.link, size: 26 }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'ISBN: ', bold: true, size: 28 }),
                  new TextRun({ text: project.isbn, size: 26 }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'ISSN: ', bold: true, size: 28 }),
                  new TextRun({ text: project.issn, size: 26 }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Revista: ', bold: true, size: 28 }),
                  new TextRun({ text: project.revista, size: 26 }),
                ],
                spacing: { after: 200 },
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Áreas: ', bold: true, size: 28 }),
                  new TextRun({
                    text: project.areasxProyecto.length ? '' : 'Sin áreas',
                    size: 26,
                  }),
                ],
                spacing: { after: 100 },
              }),

              ...project.areasxProyecto.map(
                (area: any) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: '    ◦ ', bold: true, size: 26 }),
                      new TextRun({ text: area.area.area, size: 26 }),
                    ],
                    spacing: { after: 100 },
                  })
              ),

              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  new TextRun({ text: 'Personal: ', bold: true, size: 28 }),
                  new TextRun({
                    text: project.equipoxProyecto.length ? '' : 'Sin personal',
                    size: 26,
                  }),
                ],
                spacing: { after: 100 },
              }),

              ...project.equipoxProyecto.map(
                (personal: any) =>
                  new Paragraph({
                    children: [
                      new TextRun({ text: '    ◦ ', bold: true, size: 26 }),
                      new TextRun({
                        text: obtenerNombreConRoles({
                          nombre: personal.personal.nombre,
                          consultorAsociado: personal.consultorAsociado,
                          coordinador: personal.coordinador,
                          investigador: personal.investigador,
                          subCoordinador: personal.subCoordinador,
                        }),
                        size: 26,
                      }),
                    ],
                    spacing: { after: 100 },
                  })
              ),
            ],
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      const uint8Array = new Uint8Array(buffer);
      const blob = new Blob([uint8Array], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      saveAs(blob, `proyecto${project.id}.docx`);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    projects,
    filter,
    setFilter,
    areasMapped,
    departamentos,
    getProjectsFiltered,
    handleDeleteProject,
    printOneProject,
  };
}
