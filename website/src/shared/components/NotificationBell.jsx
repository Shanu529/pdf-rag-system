// import { useState } from "react";
// import { useNotifications } from "../../context/NotificationContext";

// export default function NotificationBell() {
//   const [open, setOpen] = useState(false);

//   const { notifications } = useNotifications();

//   return (
//     <div className="relative z-50">
//       <button
//         onClick={() =>
//           console.log("notifications", notifications),
//           setOpen(!open)}
//         className="relative text-xl"
//       >
//         🔔

//         {notifications.length > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
//             {notifications.length}
//           </span>
//         )}
//       </button>


//         {open && (
//           <div className="absolute bottom-12 right-0 mt-2 w-80 bg-[#02051e] border border-[#0B21BF] shadow-lg rounded-lg z-50">

//             {notifications.length === 0 ? (

//               <p className="p-3 text-gray-400">
//                 No notifications
//               </p>

//             ) : (

//               notifications.map((item) => (

//                 <div
//                   key={item.id}
//                   className="p-3 border-b border-[#0B21BF]"
//                 >
//                    <span>📄</span>
//                   <p className="font-medium text-white">
//                     {item.fileName}
//                   </p>

//                   <p
//                     className={`text-sm ${
//                       item.status === "READY"
//                         ? "text-green-400"
//                         : "text-yellow-400"
//                     }`}
//                   >
//                     {item.status === "READY"
//                       ? "PDF Ready"
//                       : "Processing..."}
//                   </p>

//                 </div>

//               ))

//             )}

//           </div>
//         )}


//     </div>
//   );
// }

import { useState } from "react";
import { useNotifications } from "../../context/NotificationContext";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const { notifications } = useNotifications();

  console.log("here is notification",notifications);
  console.log("CURRENT NOTIFICATIONS", notifications);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        🔔
      </button>

    {open && (
      <div className="bg-black  text-white p-3">
        {notifications.map((item) => (
          <div key={item.id}>
            <p className="text-sm">{item.fileName}</p>
            <p className="text-sm">{item.status}</p>
          </div>
        ))}
      </div>
    )}


    </div>
  );
}