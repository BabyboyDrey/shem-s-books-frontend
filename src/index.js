import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import Store from './redux/store';

function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when the route changes
    setHasError(false);
  }, [props.location]); // Use props.location instead of useLocation()

  const componentDidCatch = (error, errorInfo) => {
    // Handle the error or log it
    console.error('Component Error:', error, errorInfo);
    setHasError(true);
  }

  if (hasError) {
    // Render an error message or fallback UI
    return <div>Something went wrong.</div>;
  }

  return props.children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
