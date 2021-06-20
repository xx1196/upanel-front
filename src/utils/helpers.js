import ApolloClient from "apollo-boost";

export function exportApolloClient() {

    return new ApolloClient({
        uri: process.env.REACT_APP_API_GRAPHQL,
        request: async operation => {
            const token = localStorage.getItem('access_token');
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            });
        }
    });
}
