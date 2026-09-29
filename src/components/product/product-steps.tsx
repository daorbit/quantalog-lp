import { SetupStepTile } from "../setup/setup-step-tile";

export function ProductSteps({ steps }: { steps: readonly { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-3 sm:gap-4 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className={`v-rise v-d${i + 1}`}>
          <SetupStepTile n={i + 1} title={s.title} body={s.body} />
        </li>
      ))}
    </ol>
  );
}
