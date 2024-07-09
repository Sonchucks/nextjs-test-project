'use client';

import { z } from 'zod';

export const UpdateMatchSchema = z.object({
    matchId: z.number(),
    firstTeamPts: z.string(),
    secondTeamPts: z.string(),
});

export type UpdateMatchSchemaType = z.infer<typeof UpdateMatchSchema>;
