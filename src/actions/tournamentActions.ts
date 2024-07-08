'use server';

import prismadb from '@/lib/prismadb';
import {
    calculateRounds,
    createTournamentMatchesInfo,
    generateTournamentStandings,
} from '@/lib/serverUtils';
import {
    CreateTournamentWithTeamsProps,
    GetTournamentProps,
    TournamentRequestBody,
} from '@/types/tournamentTypes';
import { findAllTeamsForTournament } from './teamActions';
import {
    createMatches,
    findFinishedMatchesForTournament,
} from './matchActions';
import { MatchWithNullableTeamIds } from '@/types/matchTypes';

export const findAllTournaments = async () => {
    try {
        const tournaments = await prismadb.tournament.findMany();

        return { success: tournaments };
    } catch (error) {
        return { error: 'Server error!' };
    }
};

export const findTournament = async (id: number) => {
    try {
        const tournament = await prismadb.tournament.findFirst({
            where: {
                id,
            },
        });

        return { success: tournament };
    } catch (error) {
        return { error: error };
    }
};

export const createTournamentWithTeams = async ({
    name,
    teams,
    numOfRounds,
}: CreateTournamentWithTeamsProps) => {
    try {
        const tournament = await prismadb.tournament.create({
            data: {
                name,
                rounds: numOfRounds,
                teams: {
                    create: teams.map(({ teamName, memberOne, memberTwo }) => {
                        return {
                            name: teamName,
                            memberOne,
                            memberTwo,
                        };
                    }),
                },
            },
        });

        return { success: tournament };
    } catch (error) {
        return { error: 'Server error!' };
    }
};

export const findTournamentWithTeams = async (id: number) => {
    try {
        const tournamentWithTeams = await prismadb.tournament.findFirst({
            where: {
                id,
            },
            include: {
                teams: true,
            },
        });

        return { success: tournamentWithTeams };
    } catch (error) {
        return { error: 'Server error!' };
    }
};

export const getTournament = async ({
    id,
    includeTeams = false,
}: GetTournamentProps) => {
    try {
        if (includeTeams) {
            const tournamentWithTeams = (await findTournamentWithTeams(id))
                .success!;

            return { success: tournamentWithTeams };
        } else {
            const tournament = (await findTournament(id)).success!;

            return { success: tournament };
        }
    } catch (error) {
        return { error: 'Server error!' };
    }
};

export const createTournament = async ({
    name,
    numOfTeams,
    teams,
}: TournamentRequestBody) => {
    try {
        const numOfRounds = calculateRounds(numOfTeams);

        const tournament = (
            await createTournamentWithTeams({ name, numOfRounds, teams })
        ).success!;

        const tournamentId = tournament.id;

        const createdTeams = (await findAllTeamsForTournament(tournamentId))
            .success!;

        const matchesToCreate = createTournamentMatchesInfo({
            numOfTeams,
            teams: createdTeams,
            tournamentId,
        });

        await createMatches(matchesToCreate);

        return { success: tournament };
    } catch (error) {
        return { error: 'Server error!' };
    }
};

export const getTournamentStandings = async (tournamentId: number) => {
    try {
        const teams = (await findAllTeamsForTournament(tournamentId)).success!;
        const finishedMatches = (
            await findFinishedMatchesForTournament(tournamentId)
        ).success!;
        const standings = generateTournamentStandings(
            teams,
            finishedMatches as MatchWithNullableTeamIds[]
        );

        return { success: standings };
    } catch (error) {
        return { error: 'Server error!' };
    }
};
