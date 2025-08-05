import { Project } from '@/lib/interfaces';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export default function PrintHook() {
  const getNameWithRoles = ({
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

    if (consultorAsociado) roles.push('Consultor Asociado');
    if (coordinador) roles.push('Coordinador');
    if (investigador) roles.push('Investigador');
    if (subCoordinador) roles.push('Subcoordinador');

    return `${nombre} - ${roles.join(', ')}`;
  };

  const getMonth = (month: number | undefined) => {
    switch (month) {
      case 0:
        return 'Enero';
      case 1:
        return 'Febrero';
      case 2:
        return 'Marzo';
      case 3:
        return 'Abril';
      case 4:
        return 'Mayo';
      case 5:
        return 'Junio';
      case 6:
        return 'Julio';
      case 7:
        return 'Agosto';
      case 8:
        return 'Septiembre';
      case 9:
        return 'Octubre';
      case 10:
        return 'Noviembre';
      case 11:
        return 'Diciembre';
      default:
        return '';
    }
  };

  const getParagraphs = (project: Project) => {
    return [
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
          new TextRun({ text: 'Descripcion: ', bold: true, size: 28 }),
          new TextRun({ text: project.descripcion || '', size: 26 }),
        ],
        spacing: { after: 200 },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: '• ', bold: true }),
          new TextRun({ text: 'Monto: ', bold: true, size: 28 }),
          new TextRun({
            text: `${project.montoContrato?.toString() || ''} ${
              project.moneda || ''
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
            text: `${getMonth(project.mesInicio)} - ${
              project.anioInicio?.toString() || ''
            }`,
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
            text: `${getMonth(project.mesFinalizacion)} - ${
              project.anioFinalizacion?.toString() || ''
            }`,
            size: 26,
          }),
        ],
        spacing: { after: 200 },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: '• ', bold: true }),
          new TextRun({ text: 'PDF: ', bold: true, size: 28 }),
          new TextRun({ text: project.pdf || '', size: 26 }),
        ],
        spacing: { after: 200 },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: '• ', bold: true }),
          new TextRun({ text: 'Link: ', bold: true, size: 28 }),
          new TextRun({ text: project.link || '', size: 26 }),
        ],
        spacing: { after: 200 },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: '• ', bold: true }),
          new TextRun({ text: 'ISBN: ', bold: true, size: 28 }),
          new TextRun({ text: project.isbn || '', size: 26 }),
        ],
        spacing: { after: 200 },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: '• ', bold: true }),
          new TextRun({ text: 'ISSN: ', bold: true, size: 28 }),
          new TextRun({ text: project.issn || '', size: 26 }),
        ],
        spacing: { after: 200 },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: '• ', bold: true }),
          new TextRun({ text: 'Revista: ', bold: true, size: 28 }),
          new TextRun({ text: project.revista || '', size: 26 }),
        ],
        spacing: { after: 200 },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: '• ', bold: true }),
          new TextRun({ text: 'Cita: ', bold: true, size: 28 }),
          new TextRun({ text: project.cita || '', size: 26 }),
        ],
        spacing: { after: 200 },
      }),

      new Paragraph({
        children: [
          new TextRun({ text: '• ', bold: true }),
          new TextRun({ text: 'Áreas: ', bold: true, size: 28 }),
          new TextRun({
            text: project.areasxProyecto?.length ? '' : 'Sin áreas',
            size: 26,
          }),
        ],
        spacing: { after: 100 },
      }),

      ...(project.areasxProyecto ?? []).map(
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
            text: project.equipoxProyecto?.length ? '' : 'Sin personal',
            size: 26,
          }),
        ],
        spacing: { after: 100 },
      }),

      ...(project.equipoxProyecto ?? []).map(
        (personal: any) =>
          new Paragraph({
            children: [
              new TextRun({ text: '    ◦ ', bold: true, size: 26 }),
              new TextRun({
                text: getNameWithRoles({
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

      new Paragraph({
        text: '----------------------------------------------------------------------',
        spacing: { after: 400 },
        alignment: AlignmentType.CENTER,
      }),
    ];
  };

  const printOneProjectHook = async (project: Project) => {
    try {
      const paragraphs = getParagraphs(project);
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
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

  const printProjectsHook = async (projects: Project[]) => {
    try {
      const paragraphs = projects.flatMap((project: Project) => {
        return getParagraphs(project);
      });
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });
      const buffer = await Packer.toBuffer(doc);
      const uint8Array = new Uint8Array(buffer);
      const blob = new Blob([uint8Array], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      saveAs(blob, `proyectos.docx`);
    } catch (error) {
      console.log(error);
    }
  };

  return { printOneProjectHook, printProjectsHook };
}
