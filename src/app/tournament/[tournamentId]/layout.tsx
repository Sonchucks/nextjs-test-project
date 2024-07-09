import * as React from 'react';
import { findTournament } from '@/actions/tournamentActions';
import TournamentViewSelect from '@/components/tournament/TournamentViewSelect';

interface TournamentLayoutProps {
    children: React.ReactNode;
    params: {
        tournamentId: string;
    };
}

const TournamentLayout: React.FC<Readonly<TournamentLayoutProps>> = async ({
    children,
    params,
}) => {
    const tournamentId = parseInt(params.tournamentId);
    const tournamentInfo = await findTournament(tournamentId);
    if (tournamentInfo.success) {
        const rounds = tournamentInfo.success.rounds;
        return (
            <div className='m-auto flex w-[250px] flex-col md:w-[400px] lg:w-[600px]'>
                <TournamentViewSelect
                    tournamentId={tournamentId}
                    rounds={rounds}
                />
                <div className='my-4'>{children}</div>
            </div>
        );
    }
};

export default TournamentLayout;
