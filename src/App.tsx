import "./App.css";
import { QueryProvider } from "./services/QueryProvider";
import AppRoutes from "./routes/App.Routes";

function App() {
  return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
}

export default App;
