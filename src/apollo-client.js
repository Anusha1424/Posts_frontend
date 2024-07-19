import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:4000/', // Your GraphQL server URI
    cache: new InMemoryCache(),
});

export { client, ApolloProvider };
