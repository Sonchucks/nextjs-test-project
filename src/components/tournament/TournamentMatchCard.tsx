'use client';

import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdSave, MdEdit } from 'react-icons/md';
import { zodResolver } from '@hookform/resolvers/zod';
import { Match } from '@prisma/client';
import { TeamResponse } from '@/types/teamTypes';
import {
    UpdateMatchSchema,
    UpdateMatchSchemaType,
} from '@/schemas/UpdateMatchSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateMatch } from '@/actions/matchActions';

interface TournamentMatchCardProps {
    match: Match;
    teams: TeamResponse[];
}

const TournamentMatchCard: React.FC<TournamentMatchCardProps> = ({
    match,
    teams,
}) => {
    // Mocking isAdmin for now
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

    const firstTeam = React.useMemo(() => {
        return teams.find((team) => team.id === match.firstTeamId);
    }, [match, teams]);

    const secondTeam = React.useMemo(() => {
        return teams.find((team) => team.id === match.secondTeamId);
    }, [match, teams]);

    const bothTeamsValid = React.useMemo(() => {
        return !!firstTeam && !!secondTeam;
    }, [firstTeam, secondTeam]);

    const canEdit = React.useMemo(() => {
        if (bothTeamsValid && (isAdmin || !match.isFinished)) {
            return true;
        }
        return false;
    }, [match, bothTeamsValid, isAdmin]);

    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const form = useForm<UpdateMatchSchemaType>({
        resolver: zodResolver(UpdateMatchSchema),
        defaultValues: {
            matchId: match.id,
            firstTeamPts: match.firstTeamPts?.toString() || '0',
            secondTeamPts: match.secondTeamPts?.toString() || '0',
        },
    });

    const handleEnableEditingMode = () => {
        setIsEditing(true);
    };

    const handleDisableEditingMode = () => {
        setIsEditing(false);
    };

    const onSubmit: SubmitHandler<UpdateMatchSchemaType> = ({
        matchId,
        firstTeamPts,
        secondTeamPts,
    }) => {
        const updateMatchReqBody = {
            id: matchId,
            firstTeamPts: parseInt(firstTeamPts, 10),
            secondTeamPts: parseInt(secondTeamPts, 10),
        };
        updateMatch(updateMatchReqBody).finally(() => {
            handleDisableEditingMode();
        });
    };

    return (
        <Card className='my-1 w-full'>
            <CardHeader>
                <CardTitle className='grid grid-cols-3 text-center'>
                    <span>{firstTeam ? firstTeam.name : 'BYE'}</span>
                    <span>VS</span>
                    <span>{secondTeam ? secondTeam.name : 'BYE'}</span>
                </CardTitle>
            </CardHeader>
            {bothTeamsValid && (
                <CardContent>
                    <Form {...form}>
                        <form
                            className='grid grid-cols-3'
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            {canEdit && isEditing ? (
                                <FormField
                                    control={form.control}
                                    name='firstTeamPts'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    className='text-center'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ) : (
                                <span className='text-center text-2xl'>
                                    {match.firstTeamPts}
                                </span>
                            )}
                            <div className='flex justify-center'>
                                {canEdit && (
                                    <>
                                        {isEditing && (
                                            <Button type='submit'>
                                                <MdSave size={20} />
                                            </Button>
                                        )}
                                        {!isEditing && (
                                            <Button
                                                onClick={
                                                    handleEnableEditingMode
                                                }
                                            >
                                                <MdEdit size={20} />
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                            {canEdit && isEditing ? (
                                <FormField
                                    control={form.control}
                                    name='secondTeamPts'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    className='text-center'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ) : (
                                <span className='text-center text-2xl'>
                                    {match.secondTeamPts}
                                </span>
                            )}
                        </form>
                    </Form>
                </CardContent>
            )}
        </Card>
    );
};

export default TournamentMatchCard;
