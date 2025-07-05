import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  //   const token =
  //     typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTc1MTcwODcwMywiZXhwIjoxNzUxNzIzMTAzfQ.NwtgWIQ-ZpK7Ztk7mhc9Ys__rVuhQvHCV5Q2RNlnc0s';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
