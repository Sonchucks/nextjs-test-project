import * as React from 'react';

interface TournamentPageProps {
    params: {
        id: string;
    };
}

const TournamentPage: React.FC<TournamentPageProps> = ({ params: { id } }) => {
    return <div>TournamentPage {id}</div>;
};

export default TournamentPage;
