import { makeAutoObservable } from "mobx";
import { fromArrayToObject } from "utils/helpers";

import { getVenueForm } from "./forms";
import SettingsService from "./service";

export default class SettingsStore implements ISSettings {
    private readonly rootStore: IRootStore;

    public venueForm: any;

    public venues: Hash<IVenue>;

    public rooms: IRRooms;

    constructor(rootStore: IRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.venues = {};
        this.rooms = [];
        this.venueForm = getVenueForm(this);
    }

    private setVenues(venues: Hash<IVenue>) {
        this.venues = venues;
    }

    private setRooms(rooms: IRRooms) {
        this.rooms = rooms;
    }

    public getVenues(): void {
        SettingsService.getVenues().then((venues) => {
            this.setVenues(fromArrayToObject(venues));
        });
    }

    public getRooms(): void {
        SettingsService.getRooms().then((rooms) => {
            this.setRooms(rooms);
        });
    }

    private submitEditVenue(): void {
        console.log(this.venues);
    }
}
