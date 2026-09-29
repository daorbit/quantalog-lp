export type PlanRow = { row: string; free: string; starter: string; pro: string };

export function ProductPlanTable({ rows }: { rows: readonly PlanRow[] }) {
  return (
    <div className="tile tile--static overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-6 py-4 text-[13px] font-medium text-fg-faint">
                Feature
              </th>
              <th scope="col" className="px-6 py-4 text-[13px] font-semibold text-fg">Free</th>
              <th scope="col" className="px-6 py-4 text-[13px] font-semibold text-fg">Starter</th>
              <th scope="col" className="bg-accent/6 px-6 py-4 text-[13px] font-semibold text-accent">Pro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((p) => (
              <tr key={p.row}>
                <th scope="row" className="px-6 py-4 text-[14.5px] font-medium text-fg">{p.row}</th>
                <td className="px-6 py-4 text-[14.5px] text-fg-muted">{p.free}</td>
                <td className="px-6 py-4 text-[14.5px] text-fg-muted">{p.starter}</td>
                <td className="bg-accent/4 px-6 py-4 text-[14.5px] text-fg">{p.pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
