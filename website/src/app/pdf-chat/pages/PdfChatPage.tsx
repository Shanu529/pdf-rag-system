function PdfChatPage() {
  return (
    <div className="flex flex-col h-full">

      {/* TOP HEADER */}
      <div className="p-4 border-b bg-white">
        <h2 className="font-semibold">Math Notes</h2>
        <p className="text-sm text-gray-500">
          Answers only from this folder
        </p>
      </div>

      {/* FILES */}
      <div className="p-4 flex gap-2">
        <div className="px-3 py-2 bg-gray-200 rounded">
          📄 Linear Algebra.pdf
        </div>
        <div className="px-3 py-2 bg-gray-200 rounded">
          📄 Calculus.pdf
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white p-4 rounded shadow w-fit">
          Hi! I answer only from PDFs.
        </div>
      </div>

      {/* INPUT */}
      <div className="p-4 border-t bg-white">
        <input
          className="w-full border rounded px-4 py-2"
          placeholder="Ask about your documents..."
        />
      </div>
    </div>
  );
}

export default PdfChatPage;