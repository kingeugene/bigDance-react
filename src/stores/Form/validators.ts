import { Validator } from "./types";

export const custom = (func: Validator) => (value, fields) => {
    return func(value, fields);
};

export const required = (canBeZero = false): Validator => (value) => {
    // eslint-disable-next-line
    if (!value || (!canBeZero && value == 0)) {
        return "Поле обязательное";
    }
};

export const alphanumeric = (): Validator => (value: string) => {
    if (!/^[a-zA-Z0-9_]*$/.test(value)) {
        return "Только буквы и числа";
    }
};

export const digits = (): Validator => (value: string) => {
    if (!/^[0-9]*$/.test(value)) {
        return "Только числа";
    }
};
//
// export const float = (): Validator => (value: string) => {
//     if (!/^\d+((\.|,)\d+)?$/.test(value)) {
//         return i18n!.t("validators.float") as string;
//     }
// };
//
// export const minValue = (min: number | string): Validator => (
//     value: string
// ) => {
//     if (+value < +min) {
//         return i18n!.t("validators.minValue", { min }) as string;
//     }
// };
//
// export const maxValue = (max: number | string): Validator => (
//     value: string
// ) => {
//     if (+value > +max) {
//         return i18n!.t("validators.maxValue", { max }) as string;
//     }
// };
//
// export const minLength = (min: number): Validator => (value) => {
//     if (value.length < min) {
//         return i18n!.t("validators.minLength", { min }) as string;
//     }
// };
//
// export const maxLength = (max: number): Validator => (value) => {
//     if (value && value.length > max) {
//         return i18n!.t("validators.maxLength", { max }) as string;
//     }
// };
//
// export const length = (length: number): Validator => (value) => {
//     if (value.length !== length) {
//         return i18n!.t("validators.length", { length }) as string;
//     }
// };
//
// export const email = (): Validator => (value: string) => {
//     if (
//         !/^(([^<>()[\]\\!`.,;:\s@"]+(\.[^<>()[\]\\!`.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
//             value
//         )
//     ) {
//         return i18n!.t("validators.email") as string;
//     }
// };
//
// export const password = (): Validator => (value: string) => {
//     if (
//         !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+=.,;:'"`(){}?!@#$%^<>&№*/~\]\\]).{8,20}$/.test(
//             value
//         )
//     ) {
//         return i18n!.t("auth.register.password") as string;
//     }
// };
//
// export const when = (condition: (value, fields) => any, func: Validator) => (
//     value,
//     fields
// ) => {
//     if (condition(value, fields)) {
//         return func(value, fields);
//     }
// };
//
// export const sameAs = (field: string, translate?: () => string): Validator => (
//     value?: string,
//     fields?
// ) => {
//     if (value !== fields[field]) {
//         return i18n!.t("validators.sameAs", {
//             label: typeof translate === "function" ? translate() : field,
//         }) as string;
//     }
// };
//
// export const notSameAs = (
//     field: string,
//     translate?: () => string
// ): Validator => (value?: string, fields?) => {
//     if (value === fields[field]) {
//         return i18n!.t("validators.notSameAs", {
//             label: typeof translate === "function" ? translate() : field,
//         }) as string;
//     }
// };
//
// export const letters = (isShuftiPro = false): Validator => (value: string) => {
//     if (isShuftiPro) {
//         if (!/^[A-Za-z\-\s,.']*$/.test(value)) {
//             return i18n!.t("validators.shuftiLetters") as string;
//         }
//     } else if (!/^[A-Za-zА-Яа-яЁё\-\s]*$/.test(value)) {
//         return i18n!.t("validators.letters") as string;
//     }
// };
