import { TournamentStanding } from '@/types/tournamentTypes';
import { MatchWithNullableTeamIds, MatchUp } from '@/types/matchTypes';
import { TeamWithNullableId } from '@/types/teamTypes';

export const calculateRounds = (numOfTeams: number) => {
    if (numOfTeams < 3) {
        throw new Error(
            'Number of teams must be at least 3 for a round robin tournament'
        );
    }

    if (numOfTeams % 2 === 0) {
        return numOfTeams - 1;
    }

    return numOfTeams;
};

export const createTournamentMatchesInfo = ({
    numOfTeams,
    teams,
    tournamentId,
}: {
    numOfTeams: number;
    teams: TeamWithNullableId[];
    tournamentId: number;
}) => {
    const teamsList = [...teams];

    if (numOfTeams % 2 === 1) {
        const byeTeam: TeamWithNullableId = {
            id: null,
            name: '',
            memberOne: '',
            memberTwo: '',
            tournamentId,
        };

        teamsList.push(byeTeam);
        numOfTeams += 1;
    }

    let mod = numOfTeams - 1;
    let decr = 0;
    let incr = -1;
    let arr = { length: numOfTeams / 2 - 1 };
    let props = ['firstTeam', 'secondTeam'];

    const template: MatchUp = {
        firstTeam: teamsList[mod],
        secondTeam: teamsList[mod],
    };

    const roundMatchUps = teamsList.slice(1).map((_, i) => {
        return {
            round: i + 1,
            matchUps: [
                {
                    ...template,
                    ...{ [props[i % 2]]: teamsList[(incr = (incr + 1) % mod)] },
                },
                ...Array.from(arr, () => ({
                    firstTeam: teamsList[(incr = (incr + 1) % mod)],
                    secondTeam: teamsList[(decr = (decr + mod - 1) % mod)],
                })),
            ],
        };
    });

    const matches: MatchWithNullableTeamIds[] = [];

    roundMatchUps.forEach((roundMatchUp) => {
        const round = roundMatchUp.round;
        roundMatchUp.matchUps.forEach((matchUp: MatchUp) => {
            const match: MatchWithNullableTeamIds = {
                firstTeamId: matchUp.firstTeam.id,
                firstTeamPts: 0,
                secondTeamId: matchUp.secondTeam.id,
                secondTeamPts: 0,
                round,
                tournamentId,
                isFinished: false,
            };

            matches.push(match);
        });
    });

    return matches;
};

export const generateTournamentStandings = (
    teams: TeamWithNullableId[],
    matches: MatchWithNullableTeamIds[]
) => {
    const standingsMap = new Map<number, TournamentStanding>();

    teams.forEach((team) => {
        const teamId = team.id as number;
        if (!standingsMap.has(teamId)) {
            standingsMap.set(teamId, {
                teamId,
                won: 0,
                lost: 0,
                tied: 0,
                points: 0,
            });
        }
    });

    const updateStanding = (teamId: number, won: boolean, tied: boolean) => {
        const standing = standingsMap.get(teamId)!;

        if (won) {
            standing.won++;
            standing.points += 3;
        } else if (tied) {
            standing.tied++;
            standing.points += 1;
        } else {
            standing.lost++;
        }

        standingsMap.set(teamId, standing);
    };

    for (const match of matches) {
        const firstTeamId = match.firstTeamId as number;
        const secondTeamId = match.secondTeamId as number;
        if (match.firstTeamPts > match.secondTeamPts) {
            updateStanding(firstTeamId, true, false);
            updateStanding(secondTeamId, false, false);
        } else if (match.secondTeamPts > match.firstTeamPts) {
            updateStanding(firstTeamId, false, false);
            updateStanding(secondTeamId, true, false);
        } else {
            updateStanding(firstTeamId, false, true);
            updateStanding(secondTeamId, false, true);
        }
    }

    const standings: TournamentStanding[] = Array.from(standingsMap.values());

    standings.sort((a, b) => b.points - a.points);

    return standings;
};
