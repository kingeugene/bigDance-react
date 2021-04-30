import BaseTabs from "Components/Common/BaseTabs/BaseTabs";
import { ITabs } from "Components/Common/BaseTabs/types";
import { observer } from "mobx-react-lite";
import React from "react";
import routes from "routes/routes";

import CardsVenue from "./components/CardsVenue/CardsVenue";

const SettingsPage: React.FC = observer(() => {
    // const {
    //     rootStore: {
    //         settingsStore: { venues },
    //     },
    // } = useStore();

    const tabs: ITabs[] = [
        {
            label: "Студии",
            value: <CardsVenue />,
        },
        {
            label: "Стили Танцев",
            value: <div>Стили Танцев</div>,
        },
    ];

    return (
        <div>
            <h1>{routes.settings.name}</h1>
            <BaseTabs tabs={tabs} />
        </div>
    );
});

export default SettingsPage;
