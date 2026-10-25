import { ALL_TOPICS } from "./topics";

export function TopicFilter({
  topics,
  active,
  onChange,
}: {
  topics: string[];
  active: string;
  onChange: (topic: string) => void;
}) {
  return (
    <div className="blog-filter" role="group" aria-label="Filter by topic">
      {[ALL_TOPICS, ...topics].map((topic) => (
        <button
          key={topic}
          type="button"
          aria-pressed={topic === active}
          onClick={() => onChange(topic)}
          className="blog-filter__item"
        >
          {topic}
        </button>
      ))}
    </div>
  );
}
