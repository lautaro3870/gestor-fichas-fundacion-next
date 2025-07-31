// cambiar los valores del name por el valor de la key del objeto project

export const SIZES_FIRST_SECTION = {
  xl: 3,
  lg: 3,
  md: 12,
  sm: 12,
};

export const SIZES_SECOND_SECTION = {
  xl: 2,
  lg: 2,
  md: 12,
  sm: 12,
};

export const FORM_INPUTS_FIRST_SECTION = [
  {
    id: 'titulo',
    label: 'Título',
    name: 'titulo',
    type: 'text',
    required: true,
    sizes: {
      xl: 12,
      lg: 12,
      md: 12,
      sm: 12,
    },
  },
  {
    id: 'paisRegion',
    label: 'País/región',
    name: 'paisRegion',
    type: 'text',
    required: false,
    sizes: SIZES_FIRST_SECTION,
  },
  {
    id: 'direccion',
    label: 'Dirección',
    name: 'direccion',
    type: 'text',
    required: false,
    sizes: SIZES_FIRST_SECTION,
  },
  {
    id: 'contratante',
    label: 'Contratante',
    name: 'contratante',
    type: 'text',
    required: false,
    sizes: SIZES_FIRST_SECTION,
  },
  {
    id: 'departamento',
    label: 'Departamento',
    name: 'departamento',
    required: false,
    type: 'select',
    sizes: SIZES_FIRST_SECTION,
    options: [
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
    ],
  },
];

export const FORM_INPUTS_SECOND_SECTION = [
  {
    id: 'numeroContrato',
    label: 'Número',
    name: 'numeroContrato',
    type: 'text',
    required: false,
    sizes: {
      xl: 4,
      lg: 4,
      md: 12,
      sm: 12,
    },
  },
  {
    id: 'montoContrato',
    label: 'Monto',
    name: 'montoContrato',
    type: 'number',
    required: false,
    sizes: SIZES_SECOND_SECTION,
  },
  {
    id: 'moneda',
    label: 'Moneda',
    name: 'moneda',
    required: false,
    type: 'select',
    sizes: SIZES_SECOND_SECTION,
    options: [
      {
        id: 'USD',
        value: 'USD',
      },
      {
        id: 'PESOS',
        value: 'PESOS',
      },
      {
        id: 'EUR',
        value: 'EUR',
      },
      {
        id: 'ECU',
        value: 'ECU',
      },
    ],
  },
  {
    id: 'enCurso',
    label: 'En Curso',
    name: 'enCurso',
    required: false,
    type: 'checkbox',
    sizes: {
      ...SIZES_SECOND_SECTION,
      md: 2,
      sm: 2,
    },
  },
  {
    id: 'convenio',
    label: 'Convenio',
    name: 'convenio',
    required: false,
    type: 'checkbox',
    sizes: {
      ...SIZES_SECOND_SECTION,
      md: 2,
      sm: 2,
    },
  },
];

export const FORM_INPUTS_THIRD_SECTION = [
  {
    id: 'mesInicio',
    label: 'Mes Inicio',
    name: 'mesInicio',
    required: false,
    type: 'select',
    sizes: SIZES_SECOND_SECTION,
    options: [
      { id: 0, value: 'Enero' },
      { id: 1, value: 'Febrero' },
      { id: 2, value: 'Marzo' },
      { id: 3, value: 'Abril' },
      { id: 4, value: 'Mayo' },
      { id: 5, value: 'Junio' },
      { id: 6, value: 'Julio' },
      { id: 7, value: 'Agosto' },
      { id: 8, value: 'Septiembre' },
      { id: 9, value: 'Octubre' },
      { id: 10, value: 'Noviembre' },
      { id: 11, value: 'Diciembre' },
    ],
  },
  {
    id: 'anioInicio',
    label: 'Año Inicio',
    name: 'anioInicio',
    type: 'number',
    required: false,
    sizes: SIZES_SECOND_SECTION,
  },
  {
    id: 'mesFinalizacion',
    label: 'Mes Finalización',
    name: 'mesFinalizacion',
    required: false,
    type: 'select',
    sizes: SIZES_SECOND_SECTION,
    options: [
      { id: 0, value: 'Enero' },
      { id: 1, value: 'Febrero' },
      { id: 2, value: 'Marzo' },
      { id: 3, value: 'Abril' },
      { id: 4, value: 'Mayo' },
      { id: 5, value: 'Junio' },
      { id: 6, value: 'Julio' },
      { id: 7, value: 'Agosto' },
      { id: 8, value: 'Septiembre' },
      { id: 9, value: 'Octubre' },
      { id: 10, value: 'Noviembre' },
      { id: 11, value: 'Diciembre' },
    ],
  },
  {
    id: 'anioFinalizacion',
    label: 'Año Finalización',
    name: 'anioFinalizacion',
    type: 'number',
    required: false,
    sizes: SIZES_SECOND_SECTION,
  },
  {
    id: 'link',
    label: 'Link',
    name: 'link',
    type: 'url',
    required: false,
    sizes: {
      xl: 4,
      lg: 4,
      md: 12,
      sm: 12,
    },
  },
];
