import { getSpringAxios } from "./axios";


export async function _userLogin(id, password) {
  try {
    const response = await getSpringAxios.post("login", { mid: id, password });
    const item = response.data;
    const payload = JSON.parse(btoa(item.accessToken.split(".")[1]));

    return {
      email: id,
      name: item.name,
      admin: payload.role === "ROLE_ADMIN",
      access_token: item.accessToken,
      refresh_token: item.refreshToken,
    };
  } catch (error) {
    console.error("로그인에 실패하였습니다.", error);
    return null;
  }
}

export async function userLogin(id, password) {
  const userData = await _userLogin(id, password);
  if (userData) {
    localStorage.setItem('accessToken', userData.access_token); 
  }
  return userData;
}

export async function registerUser(mid, name, password, phone) {
  try {
    const response = await getSpringAxios.post("join", {
      mid,
      name,
      password,
      phone,
    });
    return response.data;
  } catch (error) {
    console.error("회원가입에 실패하였습니다.", error);
    return null;
  }
}
