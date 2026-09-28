import { Route, Router } from "@solidjs/router";
import { Suspense, type JSX } from "solid-js";
import { GameProgressProvider } from "~/context/game-progress";
import { LanguageProvider } from "~/i18n/language-context";
import { RepairFeedbackProvider } from "~/context/repair-feedback";
import NotFound from "~/routes/[...404]";
import Home from "~/routes/index";
import RepairRoute from "~/routes/repair/[repairId]";
import "./app.css";

export default function App(): JSX.Element {
  return (
    <Router
      base={import.meta.env.BASE_URL}
      root={(props) => (
        <LanguageProvider>
          <GameProgressProvider>
            <RepairFeedbackProvider>
              <Suspense>{props.children}</Suspense>
            </RepairFeedbackProvider>
          </GameProgressProvider>
        </LanguageProvider>
      )}
    >
      <Route path="/" component={Home} />
      <Route path="/repair/:repairId" component={RepairRoute} />
      <Route path="/*all" component={NotFound} />
    </Router>
  );
}
