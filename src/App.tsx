import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/app_routes";
import { QueryProvider } from "./services/QueryProvider";

function App() {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.flutterwave.com/v3.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
}

export default App;
