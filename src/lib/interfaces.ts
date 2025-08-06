import { GridRenderCellParams } from '@mui/x-data-grid';

export interface Area {
  id: number;
  area: string;
  activo: boolean;
}

export interface Column {
  field: string;
  headerName: string;
  type?: string;
  renderCell?: (params: GridRenderCellParams) => JSX.Element;
}

export interface PersonalInterface {
  id: number;
  nombre: string;
  consultorAsociado: boolean;
  coordinador: boolean;
  investigador: boolean;
  subCoordinador: boolean;
  activo: boolean;
}

export interface CreatePersonal {
  id: number;
  nombre: string;
  consultorAsociado: boolean;
  coordinador: boolean;
  investigador: boolean;
  subCoordinador: boolean;
}

export interface ErrorInput {
  errorInput: boolean;
  errorMessage: string;
}

export interface CustomSelectInterface {
  id: string | number;
  value: string;
}

export interface FilterInterface {
  departamento: string | null;
  anioFinalizacion: number | null;
  anioInicio: number | null;
  areas: CustomSelectInterface[] | null;
  pais: string | null;
  titulo: string | null;
  link: boolean | null;
  pdf: boolean | null;
}

export interface Project {
  id: number;
  titulo: string;
  paisRegion: string;
  anioInicio: number;
  anioFinalizacion: number;
  montoContrato: string;
  moneda: string;
  areasxProyecto?: Array<Area>;
  departamento: string;
  contratante: string;
  direccion: string;
  numeroContrato: string;
  mesInicio: number;
  mesFinalizacion: number;
  consultoresAsociados: string;
  descripcion: string;
  resultados: string;
  fichaLista: boolean;
  enCurso: boolean;
  certConformidad: boolean;
  certificadoPor: number;
  activo: boolean;
  link: string;
  convenio: boolean;
  pdf: string;
  issn: string;
  isbn: string;
  cita: string;
  revista: string;
  equipoxProyecto?: PersonalInterface[];
}

export interface CreateOrUpdateProject {
  id?: number;
  titulo: string;
  paisRegion: string;
  anioInicio: number;
  anioFinalizacion: number;
  montoContrato: string;
  moneda: string;
  departamento: string;
  contratante: string;
  direccion: string;
  numeroContrato: string;
  mesInicio: number;
  mesFinalizacion: number;
  consultoresAsociados: string;
  descripcion: string;
  resultados: string;
  fichaLista: boolean;
  enCurso: boolean;
  certConformidad: boolean;
  certificadoPor: number;
  activo: boolean;
  link: string;
  convenio: boolean;
  pdf: string;
  issn: string;
  isbn: string;
  cita: string;
  revista: string;
  areas: Array<{ idArea: number }>;
  equipo: CreatePersonal[];
}
