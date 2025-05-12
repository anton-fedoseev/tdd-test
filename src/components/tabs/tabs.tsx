import React from 'react';
import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';

import { TabContent } from './styled';

interface ITabs {
    config: { title: string; content: React.ReactNode; }[];
}

export const Tabs: React.FC<ITabs> = ({ config }) => {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
  
    return (
        <Box sx={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <MuiTabs value={value} onChange={handleChange}>
                    {config.map(item => (
                        <MuiTab label={item.title} key={item.title} />    
                    ))}
                </MuiTabs>
            </Box>
            {config.map((item, index) => index === value && (
                <TabContent key={item.title}>
                    {item.content}
                </TabContent>
            ))}
        </Box>
    );
};
