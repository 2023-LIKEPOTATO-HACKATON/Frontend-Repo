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