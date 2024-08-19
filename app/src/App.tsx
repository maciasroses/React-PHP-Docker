import AppRouter from "@/routes/AppRouter";
import { AuthProvider, ThemeProvider } from "@/providers";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 dark:text-white scroll-smooth">
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppRouter />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
