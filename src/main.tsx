import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SourceFhirServerContextProvider from "./contexts/SourceFhirServerContext.tsx";
import "@/styles/globals.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <SourceFhirServerContextProvider>
      <App />
    </SourceFhirServerContextProvider>
  </QueryClientProvider>
);
