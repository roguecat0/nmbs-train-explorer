import {
  createContext,
  createSignal,
  Show,
  useContext,
  type JSX,
  type ParentProps,
} from "solid-js";
import RepairFeedback from "~/components/RepairFeedback";
import { getRepairMessage, type RepairMessage } from "~/data/repair-messages";
import { repairs } from "~/data/repairs";

type Feedback = { message: RepairMessage; completedCount: number };
type RepairFeedbackContextValue = { show: (completedCount: number) => void };
const RepairFeedbackContext = createContext<RepairFeedbackContextValue>();

// Keep feedback above the routes so closing a QR repair URL cannot dismiss it.
export function RepairFeedbackProvider(props: ParentProps): JSX.Element {
  const [feedback, setFeedback] = createSignal<Feedback>();
  const show = (completedCount: number): void => {
    const message = getRepairMessage(completedCount, repairs.length);
    setFeedback(message ? { message, completedCount } : undefined);
  };

  return (
    <RepairFeedbackContext.Provider value={{ show }}>
      {props.children}
      <Show when={feedback()}>
        {(current) => (
          <RepairFeedback
            message={current().message}
            completedCount={current().completedCount}
            totalCount={repairs.length}
            onClose={() => setFeedback(undefined)}
          />
        )}
      </Show>
    </RepairFeedbackContext.Provider>
  );
}

export function useRepairFeedback(): RepairFeedbackContextValue {
  const feedback = useContext(RepairFeedbackContext);
  if (!feedback) throw new Error("useRepairFeedback must be used inside RepairFeedbackProvider");
  return feedback;
}
