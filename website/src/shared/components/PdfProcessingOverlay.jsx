export default function PdfProcessingOverlay() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">

        <div className="text-5xl mb-4">
          📄
        </div>

        <h2 className="text-xl font-semibold text-white">
          Processing PDF...
        </h2>

        <p className="text-gray-400 mt-2">
          Please wait while AI analyzes your document.
        </p>

        <div className="mt-6 animate-spin h-10 w-10 border-4 border-[#0B21BF] border-t-transparent rounded-full mx-auto" />

      </div>
    </div>
  );
}