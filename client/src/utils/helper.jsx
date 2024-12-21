export const isUserLoggedIn = () => {
    let loggedInUserEmail = localStorage.getItem("isLoggedIn");
    return loggedInUserEmail ? true : false;
  };
  
export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userDetails");
    window.location.reload();
  };