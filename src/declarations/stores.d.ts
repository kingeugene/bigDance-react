interface IRootStore {
    authStore: ISAuth;
    settingsStore: ISSettings;

    initStore(): void;
}

interface ISAuth {
    authForm: any;
    jwtToken: string;
    userInfo: IRUserInfo;
    isLogined: boolean;
    isAdmin: boolean;

    getInfoUser(): void;
}

interface ISCustomers {}

interface ISSettings {
    venueForm: any;
    venues: Hash<IVenue>;
    rooms: IRRooms;

    getVenues(): void;
    getRooms(): void;
}
