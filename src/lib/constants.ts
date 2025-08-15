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

export const SIZES_FOURTH_SECTION = {
  xl: 3,
  lg: 3,
  md: 12,
  sm: 12,
};

export const SIZES_FIFTH_SECTION = {
  xl: 12,
  lg: 12,
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
        id: '',
        value: 'Seleccione',
      },
      {
        id: 'ENERGIA',
        value: 'Energía',
      },
      {
        id: 'MADE',
        value: 'MADE',
      },
      {
        id: 'ASC',
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
    type: 'string',
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
        id: '',
        value: 'Seleccione',
      },
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
      { id: -1, value: 'Seleccione' },
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
      { id: -1, value: 'Seleccione' },
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

export const FORM_INPUTS_FOURTH_SECTION = [
  {
    id: 'pdf',
    label: 'PDF',
    name: 'pdf',
    type: 'url',
    required: false,
    sizes: SIZES_FOURTH_SECTION,
  },
  {
    id: 'isbn',
    label: 'ISBN',
    name: 'isbn',
    type: 'text',
    required: false,
    sizes: SIZES_FOURTH_SECTION,
  },
  {
    id: 'issn',
    label: 'ISSN',
    name: 'issn',
    type: 'text',
    required: false,
    sizes: SIZES_FOURTH_SECTION,
  },
  {
    id: 'revista',
    label: 'Revista y/o Libro',
    name: 'revista',
    type: 'text',
    required: false,
    sizes: SIZES_FOURTH_SECTION,
  },
];

export const FORM_INPUTS_FIFTH_SECTION = [
  {
    id: 'consultoresAsociados',
    label: 'Consultores Asociados',
    name: 'consultoresAsociados',
    type: 'area',
    required: false,
    sizes: SIZES_FIFTH_SECTION,
  },
  {
    id: 'descripcion',
    label: 'Descripción',
    name: 'descripcion',
    type: 'area',
    required: false,
    sizes: SIZES_FIFTH_SECTION,
  },
  {
    id: 'cita',
    label: 'Cita',
    name: 'cita',
    type: 'area',
    required: false,
    sizes: SIZES_FIFTH_SECTION,
  },
];

export const FORM_INPUTS_SIXTH_SECTION = [
  {
    id: 'certConformidad',
    label: 'Certificado Conformidad',
    name: 'certConformidad',
    required: false,
    type: 'checkbox',
    sizes: {
      xl: 4,
      lg: 4,
      md: 2,
      sm: 2,
    },
  },
  {
    id: 'fichaLista',
    label: 'Ficha lista',
    name: 'fichaLista',
    required: false,
    type: 'checkbox',
    sizes: {
      xl: 4,
      lg: 4,
      md: 2,
      sm: 2,
    },
  },
  {
    id: 'certificadoPor',
    label: 'Certificado',
    name: 'certificadoPor',
    required: false,
    type: 'select',
    sizes: {
      xl: 4,
      lg: 4,
      md: 2,
      sm: 2,
    },
    options: [
      { id: -1, value: 'Seleccione' },
      { id: 0, value: 'Landaveri, Raúl' },
      { id: 1, value: 'Lallana, Francisco' },
      { id: 2, value: 'Nadal, Gustavo' },
      { id: 3, value: 'Di Sbroiavacca, Nicolás' },
      { id: 4, value: 'Dubrovsky, Hilda' },
      { id: 5, value: 'Recalde, Marina' },
    ],
  },
];
