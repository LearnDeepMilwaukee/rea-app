import * as React from "react";

const _loading = (
  <strong>Loading from common.tsx</strong>
);

const _error = (
  <p style={{color: "#F00"}}>API error</p>
);

export function ValidatePageLoaded(page, loading, error) {
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


