'use server';

import prismadb from '@/lib/prismadb';

export const findAllTeamsForTournament = async (tournamentId: number) => {
    try {
        const teams = await prismadb.team.findMany({
            where: {
                tournamentId,
            },
        });

        return { success: teams };
    } catch (error) {
        return { error: 'Server error!' };
    }
};
