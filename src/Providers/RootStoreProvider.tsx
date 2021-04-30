import { useLocalStore } from "mobx-react-lite";
import React, { createContext, useContext } from "react";
import RootStore from "stores/RootStore";

type StoreContextType = {
    rootStore: IRootStore;
};

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => ({ rootStore: RootStore }));
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export const useStore = () => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("useStore must be used within a StoreProvider.");
    }
    return store;
};
