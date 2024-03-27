require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefsUser, resolversUser } = require("./schemas/user");
const { typeDefsPosts, resolversPosts } = require("./schemas/posts");
const { verifyToken } = require("./helpers/jwt");
const { resolversFollow, typeDefsFollow } = require("./schemas/follow");

const server = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefsPosts, typeDefsFollow],
  resolvers: [resolversUser, resolversPosts, resolversFollow],
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: ({req, res}) => {
      return {
        id: "123",
        auth: () => {
          const auth = req.headers.authorization || '';
          if(!auth) {
            throw new Error('Invalid Token');
          }
          const token = auth.split(' ')[1];
          const decoded = verifyToken(token);
          
          return decoded
        }
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
})();
