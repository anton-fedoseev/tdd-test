import React from 'react'

import { Tabs } from '@/components';
import { AllBooks } from '@/modules/all-books';
import { PrivateBooks } from '@/modules/private-books';
import { Header } from '@/layout';

import './app.css';

export const App: React.FC = () => {
    const tabsConfig = [
        {
            title: 'All books',
            content: <AllBooks />,
        },
        {
            title: 'Private books',
            content: <PrivateBooks />,
        }
    ];

    return (
        <>
            <Header />
            <Tabs config={tabsConfig} />
        </>
    );
};
