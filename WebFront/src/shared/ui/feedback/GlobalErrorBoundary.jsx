import React from 'react';

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // In the future, log this to a service like Sentry
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                    <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-zinc-200 max-w-md">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">일시적인 오류가 발생했습니다</h1>
                        <p className="text-zinc-600 mb-6">
                            시스템 처리 중 예기치 않은 오류가 발생했습니다.<br />
                            잠시 후 다시 시도해주세요.
                        </p>
                        <button
                            onClick={() => {
                                this.setState({ hasError: false });
                                window.location.reload();
                            }}
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
                        >
                            페이지 새로고침
                        </button>
                        {import.meta.env.DEV && (
                            <details className="mt-4 text-left text-xs text-red-400 bg-red-50 p-2 rounded">
                                <summary>에러 상세</summary>
                                {this.state.error?.toString()}
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
