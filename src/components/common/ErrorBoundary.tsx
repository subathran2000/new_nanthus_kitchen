import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary to gracefully handle rendering failures
 * (e.g. Three.js / Canvas / Spline crashes on unsupported devices).
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "200px",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#F5A623", mb: 2 }}>
            Something went wrong
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.6)", mb: 3, maxWidth: 400 }}
          >
            An unexpected error occurred. Please try refreshing the page.
          </Typography>
          <Button
            variant="outlined"
            onClick={this.handleReset}
            sx={{
              color: "#F5A623",
              borderColor: "#F5A623",
              "&:hover": {
                borderColor: "#FFB84D",
                bgcolor: "rgba(59, 130, 246, 0.1)",
              },
            }}
          >
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
