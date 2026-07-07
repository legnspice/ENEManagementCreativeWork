import { SimulatorProvider } from "./_sim/SimulatorProvider";
import { Simulator } from "./_sim/Simulator";

export default function HomePage() {
  return (
    <SimulatorProvider>
      <Simulator />
    </SimulatorProvider>
  );
}
