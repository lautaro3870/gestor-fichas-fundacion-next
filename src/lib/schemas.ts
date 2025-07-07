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
