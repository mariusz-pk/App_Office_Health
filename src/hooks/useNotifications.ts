import { useEffect, useState } from 'react';
import { HABITS_LIST } from '../data';

export function useNotifications() {
  const [showBigModal, setShowBigModal] = useState(false);
  const [missingCount, setMissingCount] = useState(0);

  useEffect(() => {
    // We run checking interval every minute
    const interval = setInterval(() => {
      checkAndSendNotification();
    }, 60000);
    
    // Initial check on mount for Big Modal and missed notifications
    checkAndSendNotification(true);

    return () => clearInterval(interval);
  }, []);

  const checkAndSendNotification = (isMountCheck = false) => {
    const isEnabled = window.localStorage.getItem('corp_notificationsEnabled') === 'true';
    if (!isEnabled) return;

    const timeStr = window.localStorage.getItem('corp_notificationTime') || '17:00';
    const [targetHour, targetMinute] = timeStr.split(':').map(Number);
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const targetTimeMinutes = targetHour * 60 + targetMinute;
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    const todayStr = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
    const lastSentDate = window.localStorage.getItem('corp_notificationLastSent_DATE');

    // Make sure it's past the target time today
    if (currentTimeMinutes >= targetTimeMinutes) {
      
      // Get missing habits for today
      let missing = 0;
      try {
        const historyDataRaw = window.localStorage.getItem('corp_dailyRoutineHistory');
        const historyData = historyDataRaw ? JSON.parse(historyDataRaw) : {};
        const todayData = historyData[todayStr] || { checkedHabits: [] };
        missing = HABITS_LIST.length - (todayData.checkedHabits?.length || 0);
      } catch (e) {
        missing = HABITS_LIST.length;
      }
      
      setMissingCount(missing);

      if (missing > 0) {
        // Send actual push notification if it wasn't sent today
        if (lastSentDate !== todayStr && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Uzupełnij Rutynę!', {
            body: `Hej! Czas odznaczyć dzisiejsze zadania w zakładce Rutyna!`,
            icon: 'https://www.google.com/favicon.ico' // optional
          });
          window.localStorage.setItem('corp_notificationLastSent_DATE', todayStr);
        }

        // Show Big Modal on app mount/open if past the time and we have missing habits + we haven't shown it this session
        if (isMountCheck) {
          const dismissedDate = window.localStorage.getItem('corp_bigModalDismissed_DATE');
          if (dismissedDate !== todayStr) {
            setShowBigModal(true);
          }
        }
      }
    }
  };

  const dismissBigModal = () => {
    const now = new Date();
    const todayStr = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
    window.localStorage.setItem('corp_bigModalDismissed_DATE', todayStr);
    setShowBigModal(false);
  };

  return { showBigModal, dismissBigModal, missingCount };
}

