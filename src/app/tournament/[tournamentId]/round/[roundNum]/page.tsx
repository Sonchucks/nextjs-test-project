import { findAllForTournamentRound } from '@/actions/matchActions';
import { findAllTeamsForTournament } from '@/actions/teamActions';
import TournamentMatchCard from '@/components/tournament/TournamentMatchCard';
import * as React from 'react';

interface TournamentRoundPageProps {
    params: {
        tournamentId: string;
        roundNum: string;
    };
}

const TournamentRoundPage: React.FC<TournamentRoundPageProps> = async ({
    params: { tournamentId, roundNum },
}) => {
    const parsedTournamentId = parseInt(tournamentId, 10);
    const parsedRoundNum = parseInt(roundNum, 10);
    const roundMatchesRes = await findAllForTournamentRound(
        parsedTournamentId,
        parsedRoundNum
    );
    const teamsRes = await findAllTeamsForTournament(parsedTournamentId);
    if (roundMatchesRes.success && teamsRes.success) {
        const matches = roundMatchesRes.success;
        const teams = teamsRes.success;
        return (
            <>
                {matches.map((match) => (
                    <div key={`match-${match.id}`}>
                        <TournamentMatchCard match={match} teams={teams} />
                    </div>
                ))}
            </>
        );
    }
};

export default TournamentRoundPage;
