'use client';

import React, { useEffect, useState } from 'react';

function formatTime(): string {
  const now = new Date();
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lubumbashi',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);
  } catch {
    return now.toTimeString().slice(0, 5);
  }
}

export default function LubumbashiClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(formatTime());
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-[#F4F1EA] font-semibold" suppressHydrationWarning>
      {time || 'CAT (UTC+2)'}
    </span>
  );
}
