"use client";

import { useSim } from "./SimulatorProvider";
import { SignIn } from "./screens/SignIn";
import { Tutorial } from "./screens/Tutorial";
import { Shift } from "./screens/Shift";
import { Summary } from "./screens/Summary";
import { BleedThrough } from "./components/BleedThrough";
import { Reprimand } from "./components/Reprimand";

export function Simulator() {
  const { state } = useSim();

  if (state.phase === "signin") return <SignIn />;
  if (state.phase === "summary") return <Summary />;

  // tutorial + shift both render the dashboard; overlays sit on top.
  const device = state.activeDevice;
  return (
    <>
      <Shift />
      {(state.phase === "tutorial" || state.tutorialOpen) && <Tutorial />}
      {state.phase === "shift" && device?.kind === "bleedthrough" && <BleedThrough data={device} />}
      {state.phase === "shift" && device?.kind === "reprimand" && <Reprimand data={device} />}
    </>
  );
}
