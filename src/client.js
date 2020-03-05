import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    // graphQL server
    uri : "https://recoapp-server.herokuapp.com/graphql"
});

export default client;