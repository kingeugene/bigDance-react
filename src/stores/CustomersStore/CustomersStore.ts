import { makeAutoObservable } from "mobx";

export default class CustomersStore implements ISCustomers {
    private readonly rootStore: IRootStore;

    constructor(rootStore: IRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        // this.initForms();
    }

    // private initForms(): void {
    //     const self = this;
    //
    //     this.authForm = new FormStore({
    //         fields: {
    //             name: {
    //                 type: String,
    //                 validators: [required()],
    //             },
    //             password: {
    //                 type: String,
    //                 validators: [required()],
    //             },
    //         },
    //         async onSubmit() {
    //             await self.submitLogin();
    //         },
    //     });
    // }
}
