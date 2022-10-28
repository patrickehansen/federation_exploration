const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph'); 

const typeDefs = gql(readFileSync('./reviews.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers');
const ReviewsAPI = require('./datasources/ReviewsApi');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}), 
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      reviewsAPI: new ReviewsAPI(),
    };
  },
});

const port = 4002;
const subgraphName = 'reviews';

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });

  //rover subgraph publish flyby-6r4cy3@current --name reviews --schema ./subgraph-reviews/reviews.graphql --routing-url http://localhost:4002