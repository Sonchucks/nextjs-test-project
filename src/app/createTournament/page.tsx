import * as React from 'react';
import CreateTournamentForm from '@/components/createTournament/CreateTournamentForm';

interface CreateTournamentPageProps {}

const CreateTournamentPage: React.FC<CreateTournamentPageProps> = () => {
    return (
        <>
            <CreateTournamentForm />
        </>
    );
};

export default CreateTournamentPage;
