import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($signupInput: SignupInput!) {
    login(signupInput: $signupInput) {
      token
      usuario {
        email
        activo
      }
    }
  }
`;

// AREAS
export const GET_AREAS = gql`
  query GetAreas {
    getAreas {
      id
      area
      activo
    }
  }
`;

export const DELETE_AREA = gql`
  mutation DeleteArea($deleteAreaId: Int!) {
    deleteArea(id: $deleteAreaId) {
      id
      area
      activo
    }
  }
`;

export const GET_AREA = gql`
  query GetArea($areaId: Int!) {
    getArea(areaId: $areaId) {
      id
      area
      activo
    }
  }
`;

export const UPDATE_AREA = gql`
  mutation UpdateArea($updateArea: UpdateArea!) {
    updateArea(updateArea: $updateArea) {
      id
      area
      activo
    }
  }
`;

export const CREATE_AREA = gql`
  mutation CreateArea($createArea: CreateArea!) {
    createArea(createArea: $createArea) {
      id
      area
      activo
    }
  }
`;

// PERSONAL
export const GET_PERSONAL = gql`
  query GetOnePersonal($getOnePersonalId: Int!) {
    getOnePersonal(id: $getOnePersonalId) {
      id
      nombre
      activo
      foto
      perfil
    }
  }
`;

export const GET_PERSONALES = gql`
  query GetPersonal {
    getPersonal {
      id
      nombre
      activo
      foto
      perfil
    }
  }
`;
export const UPDATE_PERSONAL = gql`
  mutation UpdatePersonal($updatePersonal: UpdatePersonal!) {
    updatePersonal(updatePersonal: $updatePersonal) {
      id
      nombre
      activo
      foto
      perfil
    }
  }
`;

export const DELETE_PERSONAL = gql`
  mutation DeletePersonal($deletePersonalId: Int!) {
    deletePersonal(id: $deletePersonalId) {
      id
      nombre
      activo
      foto
      perfil
    }
  }
`;

export const CREATE_PERSONAL = gql`
  mutation CreatePersonal($createPersonal: CreatePersonal!) {
    createPersonal(createPersonal: $createPersonal) {
      id
      nombre
      activo
      foto
      perfil
    }
  }
`;

export const GET_PROJECTS_FILTERED = gql`
  query FilterProjects($filterProject: FilterProject!) {
    filterProjects(filterProject: $filterProject) {
      id
      titulo
      paisRegion
      contratante
      direccion
      montoContrato
      numeroContrato
      mesInicio
      anioInicio
      mesFinalizacion
      anioFinalizacion
      consultoresAsociados
      descripcion
      resultados
      fichaLista
      enCurso
      departamento
      moneda
      certConformidad
      certificadoPor
      activo
      link
      convenio
      pdf
      issn
      isbn
      cita
      revista
      areasxProyecto {
        area {
          area
          id
        }
      }
      equipoxProyecto {
        personal {
          nombre
          id
        }
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($deleteProjectId: Int!) {
    deleteProject(id: $deleteProjectId) {
      id
      titulo
      paisRegion
      contratante
      direccion
      montoContrato
      numeroContrato
      mesInicio
      anioInicio
      mesFinalizacion
      anioFinalizacion
      consultoresAsociados
      descripcion
      resultados
      fichaLista
      enCurso
      departamento
      moneda
      certConformidad
      certificadoPor
      activo
      link
      convenio
      pdf
      issn
      isbn
      cita
      revista
      areasxProyecto {
        area {
          area
          id
        }
      }
      equipoxProyecto {
        personal {
          nombre
          id
        }
      }
    }
  }
`;
