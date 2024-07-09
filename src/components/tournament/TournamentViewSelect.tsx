'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface TournamentViewSelectProps {
    tournamentId: number;
    rounds: number;
}

const TournamentViewSelect: React.FC<TournamentViewSelectProps> = ({
    tournamentId,
    rounds,
}) => {
    const router = useRouter();
    const pathname = usePathname();

    const currentView = React.useMemo(() => {
        return pathname.split('/').pop();
    }, [pathname]);

    const handleValueChange = (value: string) => {
        switch (value) {
            case 'overview':
                router.push(`/tournament/${tournamentId}/overview`);
                return;
            case 'standings':
                router.push(`/tournament/${tournamentId}/standings`);
                return;
            default:
                router.push(`/tournament/${tournamentId}/round/${value}`);
                return;
        }
    };

    return (
        <Select defaultValue={currentView} onValueChange={handleValueChange}>
            <SelectTrigger className='w-full'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='overview'>Team Overview</SelectItem>
                {Array.from({ length: rounds }).map((_, index) => (
                    <SelectItem
                        key={`round-${index + 1}`}
                        value={`${index + 1}`}
                    >
                        Round {index + 1}
                    </SelectItem>
                ))}
                <SelectItem value='standings'>Standings</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default TournamentViewSelect;
