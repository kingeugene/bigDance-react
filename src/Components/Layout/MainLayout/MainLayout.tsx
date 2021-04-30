import Header from "Components/Layout/Header/Header";
import Notification from "Components/Layout/NotificationLayout/NotificationLayout";
import { observer } from "mobx-react-lite";
import { useStore } from "Providers/RootStoreProvider";
import React, { useEffect } from "react";
import { getContentRoutes } from "routes/contentRoutes";

import styles from "./mainLayout.module.scss";

const MainLayout: React.FC = observer(() => {
    const { rootStore } = useStore();
    const { isLogined } = rootStore.authStore;

    useEffect(() => {
        if (isLogined) {
            rootStore.initStore();
        }
    }, [isLogined]);

    return (
        <>
            <div className={styles.wrap}>
                <Header />
                <main className={styles.main}>
                    {getContentRoutes(isLogined)}
                </main>
            </div>
            <Notification />
        </>
    );
});

export default MainLayout;
