import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ClockIcon from "@material-ui/icons/QueryBuilder";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStore } from "Providers/RootStoreProvider";
import React from "react";

import styles from "./cardsVenue.module.scss";

const CardsVenue: React.FC = observer(() => {
    const {
        rootStore: {
            settingsStore: { venues, rooms },
        },
    } = useStore();

    console.log(rooms);

    return (
        <div className={styles.container}>
            {Object.values(venues).map((item, index) => (
                <div key={index} className={styles.item}>
                    <div
                        className={styles.top}
                        style={{ backgroundColor: item.color }}
                    >
                        <div className={styles.setting}>
                            <div className={styles.settingIcon}>
                                <DeleteOutlineIcon />
                            </div>
                            <div className={styles.settingIcon}>
                                <EditOutlinedIcon />
                            </div>
                        </div>
                        {item.name}
                    </div>
                    <div key={index} className={styles.bottom}>
                        <div className={styles.bottomItem}>
                            <span className={styles.label}>Адрес:</span>
                            {item.location}
                        </div>
                        <div className={styles.bottomItem}>
                            <span className={styles.label}>Интервал:</span>
                            {item.interval}
                        </div>
                        <div className={styles.bottomItem}>
                            <span className={styles.label}>Залы:</span>
                            {rooms.map((room) => room.name).join(", ")}
                        </div>
                        <div className={styles.bottomItem}>
                            <span className={clsx(styles.time, styles.start)}>
                                <ClockIcon className={styles.clock} />
                                {item.start_time}
                            </span>
                            <span className={styles.separator}>-</span>
                            <span className={clsx(styles.time, styles.end)}>
                                <ClockIcon className={styles.clock} />
                                {item.end_time}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default CardsVenue;
