import { TeamInfo } from '@/types/teamTypes';

export interface TournamentRequestBody {
    name: string;
    numOfTeams: number;
    teams: TeamInfo[];
}

export interface CreateTournamentWithTeamsProps {
    name: string;
    numOfRounds: number;
    teams: TeamInfo[];
}

export interface GetTournamentProps {
    id: number;
    includeTeams?: boolean;
}

export interface TournamentStanding {
    teamId: number;
    won: number;
    lost: number;
    tied: number;
    points: number;
}

export interface Tournament {
    id: number;
    name: string;
    isArchived: boolean;
}
