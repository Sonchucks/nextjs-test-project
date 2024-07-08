'use client';

import { z } from 'zod';

export const TeamSchema = z.object({
    teamName: z.string().min(2).max(50),
    memberOne: z.string().min(2).max(50),
    memberTwo: z.string().min(2).max(50),
});

export type TeamSchemaType = z.infer<typeof TeamSchema>;

export const CreateTournamentSchema = z.object({
    name: z.string().min(2).max(50),
    numOfTeams: z.number().min(3).max(8),
    teams: z.array(TeamSchema),
});

export type CreateTournamentSchemaType = z.infer<typeof CreateTournamentSchema>;
