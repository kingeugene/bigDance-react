import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import React from "react";

import { BaseTabsProps, TabPanelProps } from "./types";

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;

    return (
        <div hidden={value !== index}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const BaseTabs: React.FC<BaseTabsProps> = ({ tabs }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="pt-4">
            <Tabs
                value={value}
                centered
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                {tabs.map((item, index) => (
                    <Tab key={index} label={item.label} />
                ))}
            </Tabs>
            {tabs.map((item, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {item.value}
                </TabPanel>
            ))}
        </div>
    );
};

export default BaseTabs;
