import * as React from "react";

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
}
