import type { SpecialItem } from "../types";

// Import local images for better control
import img1 from "../assets/images/restaurent.jpg";
import img2 from "../assets/images/special_bg.png";
import img3 from "../assets/images/bg4.jpg";
import img4 from "../assets/images/background.jpg";
import img5 from "../assets/images/bg2.jpg";
import img6 from "../assets/images/blue-paint-brush-stroke-effect.jpg";

export const specialItems: SpecialItem[] = [
  {
    src: img1,
    alt: "Nanthu's Special Biryani",
    title: "Nanthu's Special Biryani",
    description:
      "Aromatic basmati rice layered with tender meat and secret spices",
    price: "$18",
  },
  {
    src: img2,
    alt: "Jaffna Crab Curry",
    title: "Jaffna Crab Curry",
    description:
      "Fresh crab in authentic Jaffna-style curry with aromatic spices",
    price: "$25",
  },
  {
    src: img3,
    alt: "Lamb Chops Special",
    title: "Lamb Chops Special",
    description: "Succulent grilled lamb chops with mint chutney",
    price: "$22",
  },
  {
    src: img4,
    alt: "Seafood Kothu",
    title: "Seafood Kothu",
    description: "Mixed seafood with shredded roti and vegetables",
    price: "$16",
  },
  {
    src: img5,
    alt: "Butter Chicken",
    title: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken",
    price: "$16",
  },
  {
    src: img6,
    alt: "Chef's Tasting Platter",
    title: "Chef's Tasting Platter",
    description: "A curated selection of our signature dishes",
    price: "$35",
  },
  {
    src: img1,
    alt: "Mutton Kothu",
    title: "Mutton Kothu",
    description: "Rich and flavorful mutton with chopped roti",
    price: "$15",
  },
];
