export default function EmptyState({ mode, folderName }) {
  const isDoc = mode === "folder";

  return (
    <div className="text-center mt-20">
      <h2 className="text-xl font-semibold">
        {isDoc ? folderName : "General AI"}
      </h2>
    </div>
  );
}