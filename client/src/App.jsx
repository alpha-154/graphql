// Import the application's CSS file for styling
import "./App.css";

// Import the useQuery hook for executing GraphQL queries in React components
import { useQuery } from "@apollo/client";

// Import the gql function to define GraphQL queries
import { gql } from "@apollo/client";

// Define a GraphQL query to fetch todos and their associated user data
const query = gql`
  query GetTodosWithUser {
    getTodos {
      id          
      title       
      completed   
      user {      
        id        
        name      
      }
    }
  }
`;

// Define the main App component
function App() {
  // Execute the GraphQL query using the useQuery hook
  const { loading, error, data } = useQuery(query);

  // Log the fetched data to the console (for debugging purposes)
  console.log("data", data);

  // Render the component
  return (
    <div>
      {/* Display a loading message if the query is still fetching data */}
      {loading && <p>Loading...</p>}

      {/* Display an error message if the query encountered an error */}
      {error && <p>Error</p>}

      {/* Display the data in a table format once it's successfully fetched */}
      {data && (
        <div>
          <table border="1" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Completed</th>
                <th>User Name</th>
              </tr>
            </thead>
            <tbody>
              {data.getTodos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? "Yes" : "No"}</td>
                  <td>{todo.user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Export the App component as the default export
export default App;
