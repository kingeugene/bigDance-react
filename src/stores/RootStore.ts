import AuthStore from "./AuthStore/AuthStore";
import SettingsStore from "./SettingsStore/SettingsStore";

class RootStore implements IRootStore {
    public authStore: ISAuth;

    public settingsStore: ISSettings;

    constructor() {
        this.authStore = new AuthStore(this);
        this.settingsStore = new SettingsStore(this);
    }

    public initStore(): void {
        this.authStore.getInfoUser();
        this.settingsStore.getVenues();
        this.settingsStore.getRooms();
    }
}

export default new RootStore();
