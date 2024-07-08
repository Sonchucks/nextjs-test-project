import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CreateTournamentButtonProps {}

const CreateTournamentButton: React.FC<CreateTournamentButtonProps> = () => {
    return (
        <div className='m-auto flex max-w-[400px] flex-col'>
            <Button className='w-full'>
                <Link href={`/createTournament`} prefetch={false}>
                    Create New Tournament
                </Link>
            </Button>
        </div>
    );
};

export default CreateTournamentButton;
