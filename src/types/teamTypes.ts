export interface TeamInfo {
    teamName: string;
    memberOne: string;
    memberTwo: string;
}

export interface TeamWithNullableId {
    id: number | null;
    name: string;
    memberOne: string;
    memberTwo: string;
    tournamentId: number;
}
