import brakeSystemImage from "../../sample-images/tile000.png";
import headlightsImage from "../../sample-images/tile001.png";
import wheelAssemblyImage from "../../sample-images/tile002.png";
import wheelsImage from "../../sample-images/tile003.png";
import passengerDoorImage from "../../sample-images/tile004.png";
import ventilationImage from "../../sample-images/tile005.png";

export type Repair = {
  id: string;
  title: string;
  section: string;
  summary: string;
  fact: string;
  color: string;
  image: string;
};

export const repairs: Repair[] = [
  {
    id: "drivers-cab",
    title: "Driver's cab",
    section: "Front of the train",
    summary: "Restore the controls that help the driver guide every journey.",
    fact: "The cab is the train's command centre.",
    color: "sunshine",
    image: brakeSystemImage,
  },
  {
    id: "headlights",
    title: "Headlights",
    section: "Front of the train",
    summary: "Bring the train's guiding lights back on for the track ahead.",
    fact: "Bright lights help make the train easy to spot.",
    color: "sky",
    image: headlightsImage,
  },
  {
    id: "brake-system",
    title: "Brake system",
    section: "Power carriage",
    summary: "Help restore the system that lets the train stop safely.",
    fact: "Every carriage works together when a train brakes.",
    color: "coral",
    image: wheelAssemblyImage,
  },
  {
    id: "wheels",
    title: "Wheels",
    section: "Power carriage",
    summary: "Get the wheels ready to carry the train smoothly along the rails.",
    fact: "Steel wheels run on steel rails.",
    color: "mint",
    image: wheelsImage,
  },
  {
    id: "passenger-doors",
    title: "Passenger doors",
    section: "Passenger carriage",
    summary: "Repair the doors so everyone can board safely.",
    fact: "A train's doors are designed to work together.",
    color: "violet",
    image: passengerDoorImage,
  },
  {
    id: "roof-ventilation",
    title: "Roof ventilation",
    section: "Passenger carriage",
    summary: "Get fresh air flowing through the carriage again.",
    fact: "The equipment on a train roof does much more than meet the eye.",
    color: "rose",
    image: ventilationImage,
  },
];
