// img
import geprek1 from "../assets/img/restaurant/bensu.png";
import geprek2 from "../assets/img/menu/geprek2.png";
import geprek3 from "../assets/img/menu/geprek3.png";
import geprek4 from "../assets/img/menu/geprek4.png";
import geprek5 from "../assets/img/menu/geprek5.png";
import geprek6 from "../assets/img/menu/geprek6.png";
import geprek7 from "../assets/img/menu/geprek7.png";
import geprek8 from "../assets/img/menu/geprek8.png";

// Brand Logo
import burgerKing from "../assets/img/burger-king.png";
import starbucks from "../assets/img/starbucks.png";
import kfc from "../assets/img/kfc.png";
import jco from "../assets/img/jco.png";

// Restaurant image
import geprek from "../assets/img/restaurant/bensu.png";
import kopi from "../assets/img/restaurant/kopi.png";
import nasgor from "../assets/img/restaurant/nasgor.png";
import pecel from "../assets/img/restaurant/pecel.png";

export const dummyMenu = [
  {
    id: 1,
    title: "Paket Geprek",
    price: "15.000",
    photo: geprek1,
  },
  {
    id: 2,
    title: "Paket Geprek Keju",
    price: "20.000",
    photo: geprek2,
  },
  {
    id: 3,
    title: "Paket Geprek Leleh",
    price: "25.000",
    photo: geprek3,
  },
  {
    id: 4,
    title: "Paket Sambel Matah",
    price: "15.000",
    photo: geprek4,
  },
  {
    id: 5,
    title: "Mie Ayam Geprek",
    price: "17.000",
    photo: geprek5,
  },
  {
    id: 6,
    title: "Mie Ayam Geprek Keju",
    price: "22.000",
    photo: geprek6,
  },
  {
    id: 7,
    title: "Mie Ayam Leleh",
    price: "27.000",
    photo: geprek7,
  },
  {
    id: 8,
    title: "Mie Ayam Sambel Telur Asin",
    price: "22.000",
    photo: geprek8,
  },
];

export const dummyRestaurant = [
  {
    id: 1,
    title: "Geprek Bensu",
    photo: geprek,
    range: 0.2,
    logo: "",
    totalvisited: 0,
    menu: [
      {
        id: 1,
        title: "Paket Geprek",
        price: 15000,
        photo: geprek1,
      },
      {
        id: 2,
        title: "Paket Geprek Keju",
        price: 20000,
        photo: geprek2,
      },
      {
        id: 3,
        title: "Paket Geprek Leleh",
        price: 25000,
        photo: geprek3,
      },
      {
        id: 4,
        title: "Paket Sambel Matah",
        price: 15000,
        photo: geprek4,
      },
      {
        id: 5,
        title: "Mie Ayam Geprek",
        price: 17000,
        photo: geprek5,
      },
      {
        id: 6,
        title: "Mie Ayam Geprek Keju",
        price: 22000,
        photo: geprek6,
      },
      {
        id: 7,
        title: "Mie Ayam Leleh",
        price: 27000,
        photo: geprek7,
      },
      {
        id: 8,
        title: "Mie Ayam Sambel Telur Asin",
        price: 22000,
        photo: geprek8,
      },
    ],
  },
  {
    id: 2,
    title: "Nasi Goreng Mas Rony",
    photo: nasgor,
    range: 0.6,
    logo: "",
    totalvisited: 0,
    menu: [],
  },
  {
    id: 3,
    title: "Pecel Ayam Prambanan",
    photo: pecel,
    range: 0.6,
    logo: "",
    totalvisited: 0,
    menu: [],
  },
  {
    id: 4,
    title: "Kopi Kenangan",
    photo: kopi,
    range: 1.6,
    logo: "",
    totalvisited: 0,
    menu: [],
  },
  {
    id: 5,
    title: "Burger King",
    photo: "",
    range: 2.1,
    logo: burgerKing,
    totalvisited: 200,
    menu: [],
  },
  {
    id: 6,
    title: "Starbucks",
    photo: "",
    range: 2.5,
    logo: starbucks,
    totalvisited: 150,
    menu: [],
  },
  {
    id: 7,
    title: "KFC",
    photo: "",
    range: 3.6,
    logo: kfc,
    totalvisited: 100,
    menu: [
      {
        id: 1,
        title: "Crispy Box",
        price: 15000,
        photo:
          "https://files.kfcku.com/uploads/media/dummy/food/kfc-web_crispy-box_l.png",
      },
      {
        id: 2,
        title: "Wings Bucket",
        price: 20000,
        photo:
          "https://files.kfcku.com/uploads/media/food-menu/spesial/kfc-web_wingsbucket_l.png",
      },
      {
        id: 3,
        title: "Colonel Yakiniku Combo",
        price: 25000,
        photo:
          "https://files.kfcku.com/uploads/media/dummy/food/praktis/kfc-web_colonelyakinikuc_l.png",
      },
      {
        id: 4,
        title: "Zuper Krunch Combo",
        price: 40000,
        photo:
          "https://files.kfcku.com/uploads/media/dummy/food/kfc-web_zuperkrunchc_l.png",
      },
      {
        id: 5,
        title: "Zuper Box",
        price: 15000,
        photo:
          "https://files.kfcku.com/uploads/media/dummy/food/kfc-web_zuper-box_l.png",
      },
      {
        id: 6,
        title: "Zuper Krunch",
        price: 10000,
        photo:
          "https://files.kfcku.com/uploads/media/food-menu/praktis/large/kfc-web_zuper-krunch_l_1.png",
      },
    ],
  },
  {
    id: 8,
    title: "JCO",
    photo: "",
    range: 4.0,
    logo: jco,
    totalvisited: 50,
    menu: [],
  },
];

export const dummyIncome = [
  {
    id: 1,
    name: "Sugeng No Pants",
    address: "Cileungsi",
    products:
      "Paket Geprek, Paket keapwekoakewoaawoeaoewkoaewkoawkeoakweoawkeowke",
    status: 1,
  },
  {
    id: 2,
    name: "Haris Gams",
    address: "Serang",
    products: "Paket Geprek, Paket ke..",
    status: 3,
  },
  {
    id: 3,
    name: "Aziz Union",
    address: "Bekasi",
    products: "Paket Geprek, Paket ke..",
    status: 0,
  },
  {
    id: 4,
    name: "Lae Tanjung Balai",
    address: "Tanjung Balai",
    products: "Paket Geprek, Paket ke..",
    status: 2,
  },
];
