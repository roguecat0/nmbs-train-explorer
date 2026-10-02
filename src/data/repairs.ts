import driversCabImage from "../../sample-images/tile000.webp";
import headlightsImage from "../../sample-images/tile001.webp";
import brakeSystemImage from "../../sample-images/tile002.webp";
import wheelsImage from "../../sample-images/tile003.webp";
import passengerDoorImage from "../../sample-images/tile004.webp";
import ventilationImage from "../../sample-images/tile005.webp";
import paintingImage from "../../sample-images/train-painting.webp";
import electronicsImage from "../../sample-images/train-electronics.webp";

export type Repair = {
  id: RepairId;
  color: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
};

export type RepairId =
  | "painting"
  | "drivers-cab"
  | "headlights"
  | "brake-system"
  | "wheels"
  | "passenger-doors"
  | "roof-ventilation"
  | "electronics";

export const repairs: Repair[] = [
  {
    id: "painting",
    color: "sunshine",
    image: electronicsImage,
    imageWidth: 700,
    imageHeight: 658,
  },
  {
    id: "drivers-cab",
    color: "sunshine",
    image: driversCabImage,
    imageWidth: 512,
    imageHeight: 341,
  },
  {
    id: "headlights",
    color: "sky",
    image: headlightsImage,
    imageWidth: 512,
    imageHeight: 341,
  },
  {
    id: "brake-system",
    color: "coral",
    image: brakeSystemImage,
    imageWidth: 512,
    imageHeight: 341,
  },
  {
    id: "wheels",
    color: "mint",
    image: wheelsImage,
    imageWidth: 512,
    imageHeight: 341,
  },
  {
    id: "passenger-doors",
    color: "violet",
    image: passengerDoorImage,
    imageWidth: 512,
    imageHeight: 341,
  },
  {
    id: "roof-ventilation",
    color: "rose",
    image: ventilationImage,
    imageWidth: 512,
    imageHeight: 341,
  },
  {
    id: "electronics",
    color: "sky",
    image: paintingImage,
    imageWidth: 728,
    imageHeight: 624,
  },
];
