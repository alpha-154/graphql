// Import required modules
import express from "express"; // Express.js for handling HTTP requests and routing
import cors from "cors"; // CORS middleware to enable Cross-Origin Resource Sharing
import { ApolloServer } from "@apollo/server"; // Apollo Server for building a GraphQL API
import { expressMiddleware } from "@apollo/server/express4"; // Middleware to integrate Apollo Server with Express.js
import bodyParser from "body-parser"; // Middleware to parse incoming request bodies
import axios from "axios"; // HTTP client for making REST API calls

// Asynchronous function to start the server
async function startServer() {
  const app = express(); // Create an Express application

  // Create an instance of ApolloServer with schema and resolvers
  const server = new ApolloServer({
    // Define the GraphQL schema (type definitions)
    typeDefs: `
    type User {
      id: ID!              
      name: String!        
      username: String!   
      email: String!       
      website: String!    
    }
    
    type Todo {
      id: ID!              
      title: String!       
      completed: Boolean   
      user: User          
    }
    
    type Query {
      getTodos: [Todo]       
      getAllUsers: [User]    
      getUser(id: ID!): User 
    }
    `,

    // Define the resolvers (logic for fetching data for schema fields)
    resolvers: {
      // Resolver for the user field in the Todo type
      Todo: {
        user: async (todo) => {
          const { userId } = todo; // Extract userId from the todo object
          return (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${userId}`
            )
          ).data; // Fetch user data by userId
        },
      },

      // Resolvers for the queries
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data, // Fetch all to-dos

        getAllUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data, // Fetch all users

        getUser: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)) // Fetch a specific user by ID
            .data,
      },
    },
  });

  // Middleware to parse incoming JSON request bodies
  app.use(bodyParser.json());

  // Enable CORS for handling cross-origin requests
  app.use(cors());

  // Start the Apollo Server
  await server.start();

  // Attach Apollo Server middleware to the Express app at the /graphql endpoint
  app.use("/graphql", expressMiddleware(server));

  // Start the Express server and listen on port 8000
  app.listen(8000, () => {
    console.log("Server started on port 8000"); // Log a message when the server starts
  });
}

// Invoke the function to start the server
startServer();
