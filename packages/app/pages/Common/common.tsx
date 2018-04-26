import * as React from "react";

const _loading = (
  <strong>Loading from common.tsx</strong>
);

const _error = (
  <p style={{color: "#F00"}}>API error</p>
);

export const ValidatePageLoaded = ({page, loading, error}) => {
  if (loading) {
    return (
      <strong>Loading...</strong>
    );
  } else if (error) {
    return (
      <p style={{color: "#F00"}}>API error</p>
    );
  } else {
    return (
      {page}
    );
  }
};

export function ValidateLoadedPage(page, loading, error) {
  console.log("page" + page);
  console.log(typeof page);
  if (error) {
    return (
      _error
    );
  } else if (loading) {
    return (
      _loading
    );
  } else {
    return (
      page
    );
  }
}


