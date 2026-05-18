import React, { useRef } from "react";

import {
  Upload,
  FileText,
  FolderClosed,
  Lock,
} from "lucide-react";

import axios from "axios";

import { useNavigate }
from "react-router-dom";

import { isAuthenticated } from "../../shared/lib/isAuth"

function formatBytes(bytes) {

  if (!bytes) return "0 B";

  const sizes = ["B", "KB", "MB"];

  const i = Math.floor(
    Math.log(bytes) / Math.log(1024)
  );

  return (
    (bytes / Math.pow(1024, i)).toFixed(1) +
    " " +
    sizes[i]
  );

}

function FolderHeader({
  folder,
  addFiles,
}) {

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const backend =
    import.meta.env.VITE_BACKEND_URL;


    const handleUpload = async (files) => {

        // AUTH CHECK
        const authcheck =
          await isAuthenticated();

        if (!authcheck) {

          navigate("/login");

          return;

        }

        if (!files) return;

        const file = files[0];

        try {

          const formData =
            new FormData();

          formData.append(
            "file",
            file
          );

          const response =
            await axios.post(
              `${backend}/api/pdf`,
              formData,
              {
                headers: {
                  "Content-Type":
                    "multipart/form-data",
                },

                withCredentials: true,
              }
            );

          addFiles(
            folder.id,

            [
              {
                id: Date.now(),
                name: file.name,
                size: file.size,
                docId:
                  response.data.doc_id,
              },
            ],

            response.data.doc_id
          );

        } catch (error) {

          console.log(error);

        }

      };

  return (

    <div className="border-b bg-gradient-to-r from-blue-100 to-purple-100">

      <div className="max-w-5xl mx-auto px-6 py-5">

        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-500 text-white">
              <FolderClosed size={20} />
            </div>



            <div>

              <div className="flex items-center gap-2">

                <h1 className="text-lg font-semibold">
                  {folder.name}
                </h1>

                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white border text-blue-600">

                  <Lock size={12} />

                  DOCUMENT MODE

                </span>

              </div>



              <p className="text-xs text-gray-600">

                {folder.files.length} PDFs

              </p>

            </div>

          </div>



          {/* BUTTON */}
          <button

            onClick={() =>
              inputRef.current.click()
            }

            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm shadow"

          >

            <Upload size={16} />

            Upload PDF

          </button>



          {/* INPUT */}
          <input

            ref={inputRef}

            type="file"

            accept="application/pdf"

            className="hidden"

            onChange={(e) =>
              handleUpload(e.target.files)
            }

          />

        </div>



        {/* FILE LIST */}
        {folder.files.length > 0 && (

          <div className="mt-4 flex gap-3 flex-wrap">

            {folder.files.map((file) => (

              <div

                key={file.id}

                className="flex items-center gap-3 bg-white border rounded-xl px-4 py-2 shadow-sm"

              >

                <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-500 text-white">

                  <FileText size={14} />

                </div>



                <div>

                  <p className="text-sm font-medium">
                    {file.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {formatBytes(file.size)}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default FolderHeader;