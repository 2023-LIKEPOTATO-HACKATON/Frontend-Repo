import Chicken from "../assets/images/chicken.png";
import Cake from "../assets/images/cake.png";
import FriedPotato from "../assets/images/friedpotato.png";
import StarBucksCard from "../assets/images/starbuckscard.png";
import Strawberry from "../assets/images/strawberry.png";

const productList = [
  {
    id: 1,
    name: "황금올리브치킨 + 콜라1.25L",
    market: "비비큐",
    thumbnailImage: Chicken,
    coverImage: Chicken,
    category: 1001,
    price: 22500,
    discount: 19575,
    users: 582,
    endDate: "2023-08-24T00:00:00+09:00",
    notice: {
      title: "황금올리브치킨 + 콜라1.25L",
    },
    options: [
      {
        id: 1,
        name: "1kg x 1",
        price: 21000,
        discount: 1000,
      },
      {
        id: 2,
        name: "1kg x 2",
        price: 42000,
        discount: 30000,
      },
      {
        id: 3,
        name: "1kg x 3",
        price: 63000,
        discount: 44000,
      },
    ],
    tag: [105, 130, 143],
    goalPrice: 905847,
    currentPrice: 1447767,
  },
  {
    id: 2,
    name: "스트로베리 초콜릿 프라페(L)",
    market: "투썸플레이스",
    thumbnailImage: Strawberry,
    coverImage: Strawberry,
    category: 1001,
    price: 6600,
    discount: 6000,
    users: 73,
    endDate: "2023-08-24T00:00:00+09:00",
    notice: {
      title: "스트로베리 초콜릿 프라페(L)",
    },
    options: [
      {
        id: 1,
        name: "7kg 기본",
        price: 93000,
        discount: 0,
      },
    ],
    tag: [105, 130, 143],
    goalPrice: 825317,
    currentPrice: 587896,
  },
  {
    id: 3,
    name: "마이 투썸 하트",
    market: "투썸플레이스",
    thumbnailImage: Cake,
    coverImage: Cake,
    category: 1001,
    price: 37000,
    discount: 18500,
    users: 772,
    endDate: "2023-08-27T03:00:00+09:00",
    notice: {
      title: "마이 투썸 하트",
    },
    options: [
      {
        id: 1,
        name: "걱정없는 헤어볼",
        price: 15000,
        discount: 0,
      },
      {
        id: 2,
        name: "빛나는 피모",
        price: 15000,
        discount: 0,
      },
      {
        id: 3,
        name: "No 스트레스",
        price: 15000,
        discount: 0,
      },
    ],
    tag: [110, 112, 148],
    goalPrice: 701396,
    currentPrice: 890423,
  },
  {
    id: 5,
    name: "감자튀김(L)",
    market: "노브랜드버거",
    thumbnailImage: FriedPotato,
    coverImage: FriedPotato,
    category: 1002,
    price: 2400,
    discount: 2000,
    users: 84,
    endDate: "2023-08-24T00:00:00+09:00",
    notice: {
      title: "감자튀김(L)",
    },
    options: [
      {
        id: 1,
        name: "기본",
        price: 32000,
        discount: 0,
      },
    ],
    tag: [122, 134, 143],
    goalPrice: 712276,
    currentPrice: 1055795,
  },
  {
    id: 6,
    name: "무료 음료 쿠폰 (벤티 사이즈)",
    market: "스타벅스",
    thumbnailImage: StarBucksCard,
    coverImage: StarBucksCard,
    category: 1002,
    price: 7300,
    discount: 5300,
    users: 233,
    endDate: "2023-08-24T00:00:00+09:00",
    notice: {
      title: "무료 음료 쿠폰 (벤티 사이즈)",
    },
    options: [
      {
        id: 1,
        name: "기본",
        price: 28000,
        discount: 14000,
      },
    ],
    tag: [101, 106, 117],
    goalPrice: 767749,
    currentPrice: 1189054,
  },
];

export async function getProductList() {
  return JSON.parse(
    JSON.stringify(
      productList.map((item) => ({
        id: item.id,
        name: item.name,
        market: item.market,
        thumbnailImage: item.thumbnailImage,
        category: item.category,
        price: item.price,
        discount: item.discount,
        endDate: item.endDate,
        tag: item.tag,
      })),
    ),
  );
}

export async function searchProduct(keyword) {
  return JSON.parse(
    JSON.stringify(
      productList.filter(
        (item) =>
          item.name.includes(keyword) ||
          item.tag.some((tag) => tag === keyword),
      ),
    ),
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export async function getFeaturedProduct(categoryId) {
  let list = [...productList];

  if (categoryId) {
    list = list.filter((item) =>
      categoryId ? item.category === Number(categoryId) : true,
    );
  }

  shuffleArray(list);

  return {
    deadlineItems: list.slice(0, 3),
    recentItems: list.slice(0, 5),
    popularItems: list.slice(0, 3),
  };
}

export async function getProduct(id) {
  return JSON.parse(
    JSON.stringify(productList.find((item) => item.id === Number(id)) || null),
  );
}
