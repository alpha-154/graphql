// Import React's StrictMode for highlighting potential issues in the app during development
import { StrictMode } from "react";

// Import the ReactDOM createRoot method for rendering the app
import { createRoot } from "react-dom/client";

// Import the global CSS file for styling the application
import "./index.css";

// Import the main application component
import App from "./App.jsx";

// Import Apollo Client libraries for setting up GraphQL client
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Initialize the Apollo Client instance
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql", // Specify the GraphQL server endpoint
  cache: new InMemoryCache(), // Use an in-memory cache to optimize query performance
});

// Render the application to the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {" "}
    {/* Wrap the app in StrictMode to enable React's additional checks */}
    <ApolloProvider client={client}>
      {" "}
      {/* Provide the Apollo Client instance to the app */}
      <App /> {/* Render the main App component */}
    </ApolloProvider>
  </StrictMode>
);
