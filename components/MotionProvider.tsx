'use client';

import { MotionConfig } from 'framer-motion';

// Framer animations follow the visitor's "reduce motion" system setting.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
