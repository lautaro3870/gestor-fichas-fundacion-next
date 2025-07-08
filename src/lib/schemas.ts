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
