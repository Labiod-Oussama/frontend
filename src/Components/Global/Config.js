// export const serverAddress="https://1773-105-235-139-162.eu.ngrok.io";
export const serverAddress="https://b0f8-154-245-149-130.eu.ngrok.io";
const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
export const token = getCookie("token");
export const UserInfos = JSON.parse(localStorage.getItem('UserInfo'))
