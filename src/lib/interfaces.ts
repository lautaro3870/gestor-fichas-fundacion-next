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
  activo: boolean;
}

export interface ErrorInput {
  errorInput: boolean;
  errorMessage: string;
}

export interface CustomSelectInterface {
  id: string | number;
  value: string | boolean;
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
