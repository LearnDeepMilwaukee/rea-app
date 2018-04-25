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
  console.log("page" + page);
  console.log(typeof page);
  if (error) {
    return (
      <p style={{color: "#F00"}}>API error</p>
    );
  } else if (loading) {
    return (
      <strong>Loading...</strong>
    );
  } else {
    return (
      {page}
    );
  }
}
