import { getSpringAxios } from "./axios";

export async function createRequest(mid, videoFile) {
  const formData = new FormData();
  formData.append("mid", mid);
  formData.append("videoFile", videoFile);

  try {
    const response = await getSpringAxios.post(
      "board-request/create",
      formData,
    );
    return response.data;
  } catch (error) {
    console.error("인증 요청 생성에 실패하였습니다.", error);
    return null;
  }
}

export async function getRequestDetails(rno) {
  try {
    const response = await getSpringAxios.get(`board-request/${rno}`);
    return response.data;
  } catch (error) {
    console.error("인증 상세 조회에 실패하였습니다.", error);
    return null;
  }
}

export async function getListByAdmin() {
  try {
    const response = await getSpringAxios.get("board-request/list");
    return response.data;
  } catch (error) {
    console.error("관리자 인증 요청 목록 조회에 실패하였습니다.", error);
    return null;
  }
}
