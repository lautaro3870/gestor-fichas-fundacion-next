import { GridRenderCellParams } from "@mui/x-data-grid";

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
