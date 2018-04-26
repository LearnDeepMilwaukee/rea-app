import * as React from "react";

const _loading = (
  <strong>Loading...</strong>
);

const _error = {

}

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
      _loading
    );
  } else {
    return (
      {page}
    );
  }
}


