import "./App.css";
import AppRoutes from "./routes/app.routes";
import { QueryProvider } from "./services/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
}

export default App;
