import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const gc_link = new HttpLink( { uri:'https://api.graph.cool/simple/v1/cjitgitwv1vgm01892qi3gzez' });

const client = new ApolloClient({
    link: gc_link,
    cache: new InMemoryCache(),
});

const withApolloProvider = Comp => (
  <ApolloProvider client={client}>{Comp}</ApolloProvider>
);

ReactDOM.render(
    withApolloProvider(<App />),
    document.getElementById('root'));

registerServiceWorker();
