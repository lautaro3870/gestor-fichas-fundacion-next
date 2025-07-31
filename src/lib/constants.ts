// cambiar los valores del name por el valor de la key del objeto project

export const SIZES = {
  xl: 3,
  lg: 3,
  md: 12,
  sm: 12,
};

export const FORM_INPUTS_FIRST_SECTION = [
  {
    id: 'titulo',
    label: 'Título',
    name: 'titulo',
    required: true,
    sizes: {
      xl: 12,
      lg: 12,
      md: 12,
      sm: 12,
    },
  },
  {
    id: 'pais-region',
    label: 'País/región',
    name: 'pais_region',
    required: false,
    sizes: SIZES,
  },
  {
    id: 'direccion',
    label: 'Dirección',
    name: 'direccion',
    required: false,
    sizes: SIZES,
  },
  {
    id: 'contratante',
    label: 'Contratante',
    name: 'contratante',
    required: false,
    sizes: SIZES,
  },
  {
    id: 'departamento',
    label: 'Departamento',
    name: 'departamento',
    required: false,
    type: 'select',
    sizes: SIZES,
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
