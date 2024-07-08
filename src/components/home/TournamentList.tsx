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
                    <div
                        key={tournament.id}
                        className='flex w-full items-center justify-between gap-3 rounded-md border p-2'
                    >
                        <Link
                            href={`/tournament/${tournament.id}`}
                            prefetch={false}
                        >
                            <span>{tournament.name}</span>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
};

export default TournamentList;
