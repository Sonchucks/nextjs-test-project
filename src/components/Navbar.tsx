import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <header className='h-18 fixed top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950'>
            <div className='h-18 container mx-auto flex max-w-5xl items-center justify-between px-4 py-2 md:px-6'>
                <Link href='/' className='flex items-center' prefetch={false}>
                    Round Robin Tournament
                </Link>
                <nav className='space-x-4'>
                    <Button variant='outline'>Login</Button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
