import BaseButton from "Components/Common/BaseButton/BaseButton";
import BaseInput from "Components/Common/BaseInput/BaseInput";
import { observer } from "mobx-react-lite";
import { useStore } from "Providers/RootStoreProvider";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import routes from "routes/routes";

import styles from "./login.module.scss";

const Login: React.FC = observer(() => {
    const {
        rootStore: { authStore },
    } = useStore();
    const router = useHistory();

    const handleSubmitForm = (
        event: React.FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault();
        authStore.authForm.submit();
    };

    useEffect(() => {
        if (authStore.jwtToken) {
            router.push(routes.welcome.path);
        }
    }, [authStore.jwtToken, router]);

    return (
        <div className={styles.wrap}>
            <form className={styles.form} onSubmit={handleSubmitForm}>
                <h1>{routes.login.name}</h1>
                <BaseInput
                    storeKey="authStore"
                    formKey="authForm"
                    name="name"
                    label="Логин"
                    extraClassName="w-100 mt-4"
                />
                <BaseInput
                    storeKey="authStore"
                    formKey="authForm"
                    name="password"
                    type="password"
                    label="Пароль"
                    extraClassName="w-100 mb-3"
                />
                <BaseButton type="submit" loading={authStore.authForm.loading}>
                    Отправить
                </BaseButton>
            </form>
        </div>
    );
});

export default Login;
