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

export const GET_AREAS = gql`
  query Areas {
    areas {
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
  query Area($areaId: Int!) {
    area(id: $areaId) {
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
