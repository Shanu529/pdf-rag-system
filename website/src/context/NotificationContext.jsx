import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    console.log("ADDING NOTIFICATION", message);
    setNotifications((prev) => [
      {
        id: Date.now(),
        ...message,
      },
      ...prev,
    ]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);