import { ApolloServer, gql } from "apollo-server";
import resolvers from "./resolvers.js";
import { readFileSync } from "fs";
import path from "path";

const __dirname = path.resolve();

const typeDefs = readFileSync(
    path.join(__dirname, './', 'src', 'schema.graphql'),
    'utf8'
)
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})