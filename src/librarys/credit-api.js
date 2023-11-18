import { getSpringAxios } from "./axios";

export async function getMyCreditTotal() {
  const token = localStorage.getItem('accessToken'); 
  try {
    const response = await getSpringAxios.get("my/Total/{id}", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.amount; 
  } catch (error) {
    console.error("나의 크레딧 정보를 불러오는데 실패하였습니다.", error);
    return null; 
  }
}

export async function getCreditList() {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await getSpringAxios.get("credit/my/list/dhl", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("나의 크레딧 목록을 불러오는데 실패하였습니다.", error);
    return [];
  }
}