import * as React from "react";

function IconLogin(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M4 15h2v5h12V4H6v5H4V3a1 1 0 011-1h14a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z" />
    </svg>
  );
}

export default IconLogin;
