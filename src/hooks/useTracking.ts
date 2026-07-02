"use client";

import { useEffect, useCallback } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function useTracking() {
  const trackActivity = useCallback(
    async (activityType: string, targetId = "", metadata = {}) => {
      try {
        const token = localStorage.getItem("teacherdung_token");
        if (!token) return;

        await fetch(`${API_BASE_URL}/api/tracking/activity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            activityType,
            targetId,
            metadata,
          }),
        });
      } catch (err) {
        console.error("Failed to send tracking activity:", err);
      }
    },
    []
  );

  useEffect(() => {
    // Automatically start heartbeat interval if token exists
    const token = localStorage.getItem("teacherdung_token");
    if (!token) return;

    // Send initial heartbeat and page view activity
    trackActivity("heartbeat");

    const interval = setInterval(() => {
      trackActivity("heartbeat");
    }, 30000); // 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [trackActivity]);

  return { trackActivity };
}
