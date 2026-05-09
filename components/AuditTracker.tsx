"use client";

import { useEffect } from "react";

export default function AuditTracker({ id }: { id: string }) {
  useEffect(() => {
    // Trimite tracking după 1.5 sec (utilizator a stat efectiv pe pagină)
    const timer = setTimeout(() => {
      fetch("/api/track-open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        keepalive: true,
      }).catch(() => {
        // Silent fail — tracking nu trebuie să blocheze nimic
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  return null;
}
