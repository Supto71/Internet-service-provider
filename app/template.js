'use client';
import { useEffect } from 'react';

export default function Template({ children }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
}
