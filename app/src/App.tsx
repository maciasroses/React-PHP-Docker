import { AppRouter } from "./routes";
import { ThemeProvider } from "./providers";
import { AuthProvider } from "./providers/AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 dark:text-white">
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
