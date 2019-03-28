/**
 * This is a common file meant to extract functionality shared between the various pages.
 */
import * as React from "react";

const _loading = (
  <strong>Loading from common.tsx</strong>
);

const _error = (
  <p style={{color: "#F00"}}>API error</p>
);

/**
 * The original version of this function. Was intended to be called in the render stage to display
 * either the loading, error, or proper page. While this works for simple react pages, anything that
 * references a variable will not work properly. This is because since the page is now technically being
 * rendered in this file, any references to the variable are now undefined.
 *
 * If anyone should have a clean way of remedying the above, feel free to implement it.
 * Otherwise, please use getValidation instead.
 */
export function validatePageLoaded(page, loading, error) {
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

/**
 * Given loading and error, creates attributes describing the render state of the component.
 *
 * Recommended implementation:
 *
 * let validationInfo = getValidation(loading, error);
 * if ( !validationInfo.readyToRender ) { return validationInfo.component; }
 * else { return <Component> }
 *
 * @returns [ whether the final page should be loaded,
 * (if the final page is not loaded) the page to render instead ]
 */
export function getValidation(loading, error) {
  if (error) {
    return {readyToRender: false, component: _error};
  } else if (loading) {
    return {readyToRender: false, component: _loading};
  } else {
    return {readyToRender: true};
  }
}
