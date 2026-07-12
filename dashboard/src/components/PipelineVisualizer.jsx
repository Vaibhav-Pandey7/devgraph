/**
 * PipelineVisualizer.jsx
 */

import useProjectStore, {
  PIPELINE_PHASES,
  NODE_LABELS,
} from "../store/projectStore";

export default function PipelineVisualizer() {
  const completedNodes = useProjectStore((s) => s.completedNodes);
  const activeNode = useProjectStore((s) => s.activeNode);
  const currentPhase = useProjectStore((s) => s.currentPhase);

  const phases = Object.entries(PIPELINE_PHASES);

  return (
    <div className="pipeline">
      {phases.map(([phaseKey, phase]) => {
        const isActivePhase = currentPhase === phaseKey;
        const phaseCompleted = phase.nodes.every((n) =>
          completedNodes.includes(n)
        );
        const hasCompletedNode = phase.nodes.some((n) =>
          completedNodes.includes(n)
        );

        let rowClass = "row--idle";
        if (phaseCompleted) rowClass = "row--done";
        else if (isActivePhase || hasCompletedNode) rowClass = "row--active";

        return (
          <div key={phaseKey} className={`ledger-row ${rowClass}`}>
            <span className="ledger-cursor">
              {rowClass === "row--active" ? "▍" : rowClass === "row--done" ? "✓" : "·"}
            </span>
            <span className="ledger-phase">{phase.label}</span>
            <div className="ledger-nodes">
              {phase.nodes.map((nodeName) => {
                const isActive = nodeName === activeNode;
                const isDone = completedNodes.includes(nodeName);
                const nodeClass = isActive
                  ? "node--active"
                  : isDone
                  ? "node--done"
                  : "";

                return (
                  <span
                    key={nodeName}
                    className={`ledger-node ${nodeClass}`}
                    title={NODE_LABELS[nodeName] || nodeName}
                  >
                    {NODE_LABELS[nodeName] || nodeName}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
