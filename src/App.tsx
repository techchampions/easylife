import "./App.css";
import AppRoutes from "./routes/App.Routes";
import { QueryProvider } from "./services/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
}

export default App;
