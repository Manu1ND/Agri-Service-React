import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {console.log(error)}
      <p>
        {error && (
          <i>{error.statusText || error.message}</i>)}
        {!error && (
          <i>Page Not Found</i>)}
      </p>
    </div>
  );
}
