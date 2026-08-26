import brakeSystemImage from "../../sample-images/tile000.png";
import headlightsImage from "../../sample-images/tile001.png";
import wheelAssemblyImage from "../../sample-images/tile002.png";
import wheelsImage from "../../sample-images/tile003.png";
import passengerDoorImage from "../../sample-images/tile004.png";
import ventilationImage from "../../sample-images/tile005.png";

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
    image: brakeSystemImage,
  },
  {
    id: "headlights",
    color: "sky",
    image: headlightsImage,
  },
  {
    id: "brake-system",
    color: "coral",
    image: wheelAssemblyImage,
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
