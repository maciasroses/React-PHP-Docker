import Card404 from "./Card404";
import { Component } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  errorDescription: string;
}

class ErrorBoundary extends Component<
  React.PropsWithChildren<object>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props);
    this.state = { hasError: false, errorMessage: "", errorDescription: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      errorMessage: error.name,
      errorDescription: error.message,
    };
  }

  //   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  //     // Puedes registrar el error en un servicio de monitoreo
  //     console.error("Error:", error, errorInfo);
  //   }

  render() {
    if (this.state.hasError) {
      return (
        <Card404
          title={this.state.errorMessage}
          description={this.state.errorDescription}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
