import * as React from 'react';
import { findAllTeamsForTournament } from '@/actions/teamActions';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface TournamentOverviewPageProps {
    params: {
        tournamentId: string;
    };
}

const TournamentOverviewPage: React.FC<TournamentOverviewPageProps> = async ({
    params: { tournamentId },
}) => {
    const parsedTournamentId = parseInt(tournamentId);
    const teamsRes = await findAllTeamsForTournament(parsedTournamentId);
    if (teamsRes.success) {
        const teams = teamsRes.success;
        return (
            <div className='mx-auto flex flex-row flex-wrap justify-evenly'>
                {teams.map((team) => {
                    return (
                        <Card
                            key={`team-${team.id}`}
                            className='my-1 w-[250px] text-center md:m-1 md:w-[150px]'
                        >
                            <CardHeader>
                                <CardTitle>{team.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {team.memberOne}
                                </CardDescription>
                                <CardDescription>
                                    {team.memberTwo}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        );
    }
};

export default TournamentOverviewPage;
