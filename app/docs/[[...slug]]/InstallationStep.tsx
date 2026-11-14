'use client';

import { useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

export default function InstallationStep({
    title,
    children,
    defaultOpen = false
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="border-b border-white/10"
        >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left font-medium text-white/90 hover:text-white transition-colors">
                {title}
                <ChevronDown
                    className={`w-4 h-4 text-white/40 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="pb-6 text-white/70 text-sm leading-relaxed space-y-2">
                    {children}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
