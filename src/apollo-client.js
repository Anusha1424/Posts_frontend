import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'https://postapi-two.vercel.app/', // Your GraphQL server URI
    cache: new InMemoryCache(),
});

export { client, ApolloProvider };
