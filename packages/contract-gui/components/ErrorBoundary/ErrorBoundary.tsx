import { Component, ErrorInfo, ReactNode } from "react";

import { Text } from "ui-kit";

import { OutputRenderer } from "../OutputRenderer/OutputRenderer";

type Props = {
  children?: ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.error) {
      return (
        <div className="p-6">
          <Text.Large>An error occurred</Text.Large>
          <Text.P className="mb-6">
            Please refresh the page and try again
          </Text.P>
          <OutputRenderer status="error">
            {this.state.error.message}
          </OutputRenderer>
        </div>
      );
    }

    return this.props.children;
  }
}
