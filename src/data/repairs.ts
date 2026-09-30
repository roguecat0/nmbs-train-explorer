import driversCabImage from "../../sample-images/tile000.webp";
import headlightsImage from "../../sample-images/tile001.webp";
import brakeSystemImage from "../../sample-images/tile002.webp";
import wheelsImage from "../../sample-images/tile003.webp";
import passengerDoorImage from "../../sample-images/tile004.webp";
import ventilationImage from "../../sample-images/tile005.webp";

export type Repair = {
  id: RepairId;
  color: string;
  image: string;
};

export type RepairId =
  "drivers-cab" | "headlights" | "brake-system" | "wheels" | "passenger-doors" | "roof-ventilation";

export const repairs: Repair[] = [
  {
    id: "drivers-cab",
    color: "sunshine",
    image: driversCabImage,
  },
  {
    id: "headlights",
    color: "sky",
    image: headlightsImage,
  },
  {
    id: "brake-system",
    color: "coral",
    image: brakeSystemImage,
  },
  {
    id: "wheels",
    color: "mint",
    image: wheelsImage,
  },
  {
    id: "passenger-doors",
    color: "violet",
    image: passengerDoorImage,
  },
  {
    id: "roof-ventilation",
    color: "rose",
    image: ventilationImage,
  },
];
