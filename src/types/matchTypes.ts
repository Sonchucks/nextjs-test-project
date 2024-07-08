import { TeamWithNullableId } from '@/types/teamTypes';

export interface MatchWithNullableTeamIds {
    firstTeamId: number | null;
    firstTeamPts: number;
    secondTeamId: number | null;
    secondTeamPts: number;
    round: number;
    tournamentId: number;
    isFinished: boolean;
}

export interface MatchUp {
    firstTeam: TeamWithNullableId;
    secondTeam: TeamWithNullableId;
}

export interface UpdateMatchRequestBody {
    id: number;
    firstTeamPts: number;
    secondTeamPts: number;
}
