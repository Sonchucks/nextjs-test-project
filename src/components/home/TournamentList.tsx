import * as React from 'react';
import Link from 'next/link';
import { findAllTournaments } from '@/actions/tournamentActions';

interface TournamentListProps {}

const TournamentList: React.FC<TournamentListProps> = async () => {
    const tournaments = await findAllTournaments();

    if (tournaments.success) {
        return (
            <div className='m-auto my-4 flex max-w-[400px] flex-col'>
                {tournaments.success.map((tournament) => (
                    <Link
                        key={tournament.id}
                        href={`/tournament/${tournament.id}/overview`}
                        prefetch={false}
                    >
                        <div className='flex w-full items-center justify-between gap-3 rounded-md border p-2'>
                            <span>{tournament.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }
};

export default TournamentList;
