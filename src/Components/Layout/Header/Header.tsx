import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { observer } from "mobx-react-lite";
import { useStore } from "Providers/RootStoreProvider";
import React from "react";
import { useHistory } from "react-router-dom";
import routes from "routes/routes";

import styles from "./header.module.scss";

const Header: React.FC = observer(() => {
    const router = useHistory();
    const {
        rootStore: {
            authStore: { isLogined, isAdmin },
        },
    } = useStore();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <div className={styles.linkWrap}>
                    {Object.values(routes)
                        .filter(
                            (item) =>
                                item.meta.requiresAuth === isLogined ||
                                item.meta.requiresAdmin === isAdmin
                        )
                        .map((item) => (
                            <div
                                className={styles.link}
                                key={item.name}
                                onClick={() => router.push(item.path)}
                            >
                                {item.name}
                            </div>
                        ))}
                </div>
            </Toolbar>
        </AppBar>
    );
});

export default Header;
