'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    CreateTournamentSchema,
    CreateTournamentSchemaType,
} from '@/schemas/CreateTournamentSchema';
import { createTournament } from '@/actions/tournamentActions';

interface CreateTournamentFormProps {}

const CreateTournamentForm: React.FC<CreateTournamentFormProps> = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const router = useRouter();

    const form = useForm<CreateTournamentSchemaType>({
        resolver: zodResolver(CreateTournamentSchema),
        defaultValues: {
            name: '',
            numOfTeams: 3,
            teams: Array.from({ length: 3 }, () => ({
                teamName: '',
                memberOne: '',
                memberTwo: '',
            })),
        },
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'teams',
    });
    const numOfTeams = form.watch('numOfTeams');

    const handleNumOfTeamsChange = React.useCallback(
        (updatedNumOfTeams: number) => {
            const currentLength = fields.length;

            if (updatedNumOfTeams > currentLength) {
                for (let i = currentLength; i < updatedNumOfTeams; i++) {
                    append({
                        teamName: '',
                        memberOne: '',
                        memberTwo: '',
                    });
                }
            } else if (updatedNumOfTeams < currentLength) {
                for (let i = currentLength - 1; i >= updatedNumOfTeams; i--) {
                    remove(i);
                }
            }
        },
        [append, fields, remove]
    );

    React.useEffect(() => {
        handleNumOfTeamsChange(numOfTeams);
    }, [numOfTeams, handleNumOfTeamsChange]);

    const onSubmit: SubmitHandler<CreateTournamentSchemaType> = (data) => {
        setLoading(true);
        createTournament(data)
            .then((data) => {
                if (error) {
                    setError(data.error);
                    return;
                }
                if (data.success) {
                    router.push(`/tournament/${data.success.id}`);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tournament Name</FormLabel>
                            <FormControl>
                                <Input placeholder='' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='numOfTeams'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel># of Teams</FormLabel>
                            <FormControl>
                                <Tabs
                                    defaultValue='3'
                                    className='w-[400px]'
                                    onValueChange={(value) => {
                                        form.setValue(
                                            'numOfTeams',
                                            parseInt(value, 10)
                                        );
                                    }}
                                >
                                    <TabsList className='grid w-full grid-cols-6'>
                                        <TabsTrigger value='3'>3</TabsTrigger>
                                        <TabsTrigger value='4'>4</TabsTrigger>
                                        <TabsTrigger value='5'>5</TabsTrigger>
                                        <TabsTrigger value='6'>6</TabsTrigger>
                                        <TabsTrigger value='7'>7</TabsTrigger>
                                        <TabsTrigger value='8'>8</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className='grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                    {fields.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <FormLabel>Team {index + 1}</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`teams.${index}.teamName`}
                                    render={({ field }) => (
                                        <FormItem className='p-1'>
                                            <FormControl>
                                                <Input
                                                    placeholder='Team Name'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`teams.${index}.memberOne`}
                                    render={({ field }) => (
                                        <FormItem className='p-1'>
                                            <FormControl>
                                                <Input
                                                    placeholder='Member One'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`teams.${index}.memberTwo`}
                                    render={({ field }) => (
                                        <FormItem className='p-1'>
                                            <FormControl>
                                                <Input
                                                    placeholder='Member Two'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        );
                    })}
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
};

export default CreateTournamentForm;
