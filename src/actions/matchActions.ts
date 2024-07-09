'use server';

import prismadb from '@/lib/prismadb';
import {
    MatchWithNullableTeamIds,
    UpdateMatchRequestBody,
} from '@/types/matchTypes';
import { revalidatePath } from 'next/cache';

export const findAllForTournamentRound = async (
    tournamentId: number,
    round: number
) => {
    try {
        const matches = await prismadb.match.findMany({
            where: {
                tournamentId,
                round,
            },
        });

        return { success: matches };
    } catch (error) {
        return { error: 'Server error!' };
    }
};

export const findFinishedMatchesForTournament = async (
    tournamentId: number
) => {
    try {
        const matches = await prismadb.match.findMany({
            where: {
                tournamentId,
                isFinished: true,
            },
        });

        return { success: matches };
    } catch (error) {
        return { error: 'Server error!' };
    }
};

export const createMatches = async (matches: MatchWithNullableTeamIds[]) => {
    try {
        const createdMatches = await prismadb.match.createMany({
            data: matches,
        });

        return { success: createdMatches };
    } catch (error) {
        return { error: 'Server error!' };
    }
};

export const updateMatch = async ({
    id,
    firstTeamPts,
    secondTeamPts,
}: UpdateMatchRequestBody) => {
    try {
        const updatedMatch = await prismadb.match.update({
            where: {
                id,
            },
            data: {
                firstTeamPts,
                secondTeamPts,
                isFinished: true,
            },
        });
        revalidatePath(
            `/tournament/${updatedMatch.id}/round/${updatedMatch.round}`
        );
        return { success: updatedMatch };
    } catch (error) {
        return { error: 'Server error!' };
    }
};
