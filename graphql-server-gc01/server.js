require('dotenv').config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefsUser,resolversUser } = require('./schemas/user');



const server = new ApolloServer({
  typeDefs: typeDefsUser,
  resolvers: resolversUser,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: () => {
      return {
        id: "123",
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
})();
