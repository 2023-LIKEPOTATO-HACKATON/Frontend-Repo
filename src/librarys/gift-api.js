import { getSpringAxios } from "./axios";

export async function createGift(giftData) {
  const formData = new FormData();
  formData.append('mid', giftData.mid);
  formData.append('gift_name', giftData.gift_name);
  formData.append('brand_name', giftData.brand_name);
  formData.append('price', giftData.price);
  formData.append('credit', giftData.credit);
  if (giftData.imageFile) {
    formData.append('imageFile', giftData.imageFile);
  }

  try {
    const response = await getSpringAxios.post("gift/create", formData);
    return response.data; 
  } catch (error) {
    console.error("기프트콘 생성에 실패하였습니다.", error);
    return null; 
  }
}

export async function getGiftList(page = 1) {
  try {
    const response = await getSpringAxios.get(`gift/list`, {
      params: {
        page,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("기프티콘 목록을 불러오는데 실패하였습니다.", error);
    return null;
  }
}


export async function deleteGift(gno) {
  try {
    const response = await getSpringAxios.delete(`gift/delete/${gno}`);
    return response.data; 
  } catch (error) {
    console.error("기프트콘 삭제에 실패하였습니다.", error);
    return null;
  }
}

export async function getGiftDetails(gno) {
  try {
    const response = await getSpringAxios.get(`gift/${gno}`);
    return response.data; 
  } catch (error) {
    console.error("기프트콘 상세 정보를 불러오는데 실패하였습니다.", error);
    return null; 
  }
}

export async function purchaseProduct(gno, mid) {
  const formData = new FormData();
  formData.append('gno', gno);
  formData.append('mid', mid);

  try {
    const response = await getSpringAxios.post("gift/purchase", formData);
    return response.data;
  } catch (error) {
    console.error("상품 구매에 실패하였습니다.", error);
    return null;
  }
}