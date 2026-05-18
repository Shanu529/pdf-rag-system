import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Send,
  FolderClosed,
} from "lucide-react";

function ChatView({
  mode,
  folderName,
  messages,
  sendMessage,
  isTyping,
}) {

  const [text, setText] =
    useState("");

  const endRef = useRef(null);

  useEffect(() => {

    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, isTyping]);

  const handleSend = () => {

    if (!text.trim()) return;

    sendMessage(text);

    setText("");

  };

  return (

  <div className="flex flex-col h-full w-full bg-gray-50 overflow-hidden">

    {/* CHAT AREA */}
    {/* <div className="flex-1 overflow-y-auto px-4 py-4"> */}
    <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">

      {/* EMPTY MESSAGE */}
      {messages.length === 0 && (

        <div className="max-w-3xl mx-auto">

          <div className="flex items-start gap-3">

            <div className="p-2 rounded-full bg-blue-500 text-white">
              <FolderClosed size={16} />
            </div>

            <div className="bg-white border rounded-xl px-4 py-3 shadow-sm text-sm">
              Hi! I can answer questions based only on the PDFs in this{" "}
              <b>{folderName}</b> folder.
              <br />
              What would you like to know?
            </div>

          </div>

        </div>

      )}

      {/* MESSAGES */}
      <div className="mt-6 space-y-4 max-w-3xl mx-auto">

        {messages.map((msg) => (

          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`px-4 py-2 rounded-xl text-sm max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.content}
            </div>

          </div>

        ))}

        {isTyping && (
          <div className="text-sm text-gray-500">
            typing...
          </div>
        )}

        <div ref={endRef}></div>

      </div>

    </div>

    {/* INPUT */}
    <div className="border-t bg-white p-4">

      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">

          <input
            type="text"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask something..."
            className="flex-1 bg-transparent outline-none text-sm"
          />

          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            <Send size={16} />
          </button>

        </div>

      </div>

    </div>

  </div>

);

}

export default ChatView;