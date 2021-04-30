import lockr from "lockr";
import { makeAutoObservable } from "mobx";
import { api } from "Services/config";
import { FormStore, required } from "stores/Form";
import { JWT_TOKEN } from "utils/constants";

import AuthService from "./service";

export default class AuthStore implements ISAuth {
    private readonly rootStore: IRootStore;

    public jwtToken: string;

    public userInfo: IRUserInfo;

    public authForm: any;

    constructor(rootStore: IRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.jwtToken = lockr.get(JWT_TOKEN);
        this.userInfo = {
            role: "customer",
            name: "",
        };

        this.initForms();
    }

    private setJwtToken(jwtToken): void {
        this.jwtToken = jwtToken;
    }

    private setUserInfo(userInfo: IRUserInfo): void {
        this.userInfo = userInfo;
    }

    get isLogined(): boolean {
        return !!this.jwtToken;
    }

    get isAdmin(): boolean {
        return this.userInfo.role === "root";
    }

    public getInfoUser(): void {
        AuthService.getUserInfo().then((data) => {
            this.setUserInfo(data);
        });
    }

    public static logout(): void {
        AuthService.logout().then(() => {
            lockr.rm(JWT_TOKEN);
            window.location.reload();
        });
    }

    private submitLogin(): void {
        AuthService.login(this.authForm.getAllFields()).then(
            ({ access_token }) => {
                lockr.set(JWT_TOKEN, access_token);
                api.setHeader("Authorization", `Bearer ${access_token}`);
                this.setJwtToken(access_token);
            }
        );
    }

    private initForms(): void {
        const self = this;

        this.authForm = new FormStore({
            fields: {
                name: {
                    type: String,
                    validators: [required()],
                },
                password: {
                    type: String,
                    validators: [required()],
                },
            },
            async onSubmit() {
                await self.submitLogin();
            },
        });
    }
}
