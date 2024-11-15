"use client";

const ErrorWrapper = ({ error }: { error: Error }) => {
  return <h2>Oops !!! Unable to fetch cars because: {error.message}</h2>;
};
export default ErrorWrapper;
