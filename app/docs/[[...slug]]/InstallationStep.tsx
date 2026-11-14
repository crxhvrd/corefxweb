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
            className="mb-4 border border-white/10 rounded-lg bg-black/40 overflow-hidden"
        >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors text-left font-semibold text-lg">
                {title}
                <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="p-4 pt-0 border-t border-white/10 text-gray-300 space-y-2 mt-4">
                    {children}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
