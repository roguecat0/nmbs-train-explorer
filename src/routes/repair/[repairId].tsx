import { useParams } from "@solidjs/router";
import type { JSX } from "solid-js";
import GameScreen from "~/components/GameScreen";
import { repairs } from "~/data/repairs";

export default function RepairRoute(): JSX.Element {
  const params = useParams();
  const repairId = (): string | undefined =>
    repairs.some((repair) => repair.id === params.repairId) ? params.repairId : undefined;
  return <GameScreen initialRepairId={repairId()} />;
}
