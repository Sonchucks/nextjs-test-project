import * as React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getTournamentStandings } from '@/actions/tournamentActions';
import { findAllTeamsForTournament } from '@/actions/teamActions';
import TournamentViewSelect from '@/components/tournament/TournamentViewSelect';

interface TournamentStandingsPageProps {
    params: {
        tournamentId: string;
    };
}

const TournamentStandingsPage: React.FC<TournamentStandingsPageProps> = async ({
    params: { tournamentId },
}) => {
    const parsedTournamentId = parseInt(tournamentId, 10);
    const tournamentTeamsRes =
        await findAllTeamsForTournament(parsedTournamentId);
    const tournamentStandingsRes =
        await getTournamentStandings(parsedTournamentId);

    if (tournamentTeamsRes.success && tournamentStandingsRes.success) {
        const tournamentStandings = tournamentStandingsRes.success;
        const teams = tournamentTeamsRes.success;
        return (
            <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[250px]'>Team Name</TableHead>
                        <TableHead className='text-center'>Won</TableHead>
                        <TableHead className='text-center'>Tied</TableHead>
                        <TableHead className='text-center'>Lost</TableHead>
                        <TableHead className='text-right'>Points</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tournamentStandings.map((standing, index) => {
                        const team = teams.find(
                            (t) => t.id === standing.teamId
                        )!;
                        return (
                            <TableRow key={`${index}-${team.name}-row`}>
                                <TableCell className='font-medium'>
                                    {team.name}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {standing.won}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {standing.tied}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {standing.lost}
                                </TableCell>
                                <TableCell className='text-right'>
                                    {standing.points}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
};

export default TournamentStandingsPage;
