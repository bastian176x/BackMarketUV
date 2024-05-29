import React, { useEffect, useState } from "react";
import appFirebase from "../credenciales";
import { getDatabase, ref, onValue } from "firebase/database";

const database = getDatabase(appFirebase);

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return; // Asegúrate de que userId esté definido

    const notificationsRef = ref(database, 'notifications');
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      const userNotifications = [];
      for (let id in data) {
        if (data[id].userId === userId) {
          userNotifications.push({ id, ...data[id] });
        }
      }
      setNotifications(userNotifications);
    });

    return () => unsubscribe();
  }, [userId]); // Añade userId como dependencia

  return (
    <div className="notifications">
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <div key={notification.id} className="notification">
            {notification.message}
          </div>
        ))
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};

export default Notifications;
