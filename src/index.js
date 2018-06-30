import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

// Set up subscription
const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/cjitgitwv1vgm01892qi3gzez`,
  options: {
    reconnect: true
  },
});

const httpLink = new HttpLink( { uri:'https://api.graph.cool/simple/v1/cjitgitwv1vgm01892qi3gzez' });

// Splits the requests based on the query type -
// E.g. subscriptions go to wsLink and everything else to httpLink
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' &&
           operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

const withApolloProvider = Comp => (
  <ApolloProvider client={client}>{Comp}</ApolloProvider>
);

ReactDOM.render(
    withApolloProvider(<App />),
    document.getElementById('root'));

registerServiceWorker();
