import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const routeError = useRouteError();
  const errorMessage =
    routeError?.statusText || routeError?.message || "The page you requested does not exist.";

  return (
    <main className="page">
      <div className="container not-found">
        <p className="not-found-code">404</p>
        <h1 className="page-title">Page Not Found</h1>
        <p className="empty-message">{errorMessage}</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </main>
  );
}
