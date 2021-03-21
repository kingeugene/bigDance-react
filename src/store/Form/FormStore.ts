// // eslint-disable-next-line import/no-unresolved
// import { Hash } from "@Interfaces";
// import debounce from "lodash/debounce";
// import { action, computed, makeObservable, observable } from "mobx";
//
// import {
//     DefaultValues,
//     ErrorsState,
//     FieldsHash,
//     FieldsState,
//     FieldTypes,
//     IFormOptions,
//     IFormState,
//     ISubmitMeta,
// } from "./types";
//
// export class FormStore<TFields = any> {
//     private readonly fields: FieldsHash<TFields>;
//
//     private readonly defaultValues: DefaultValues | undefined;
//
//     private readonly debouncedFieldValidators!: Hash<() => any>;
//
//     public onSubmit: (payload: any) => void;
//
//     @observable
//     public state: IFormState<TFields>;
//
//     constructor(private options: IFormOptions<TFields>) {
//         makeObservable(this);
//         this.fields = this.options.fields;
//         this.defaultValues = this.options.defaultValues;
//         this.state = this.getDefaultState();
//         this.onSubmit = this.options.onSubmit;
//         this.options.debounce = this.options.debounce || 300;
//
//         Object.keys(this.fields).forEach((field) => {
//             if (!this.fields[field].hooks) {
//                 this.fields[field].hooks = {};
//             }
//         });
//
//         this.debouncedFieldValidators = Object.keys(this.fields).reduce(
//             (acc, key) => {
//                 acc[key] = debounce(() => {
//                     this.validate(key);
//                 }, this.options.debounce);
//
//                 return acc;
//             },
//             {}
//         );
//     }
//
//     @action
//     public setFieldValue({
//         field,
//         value,
//         trusted = false,
//     }: {
//         field: string;
//         value: string;
//         trusted?: boolean;
//     }): void {
//         this.state.fields = { ...this.state.fields, [field]: value };
//
//         if (!this.state.touched.has(field as keyof TFields) && trusted) {
//             this.state.touched = this.state.touched.add(field as keyof TFields);
//         }
//     }
//
//     @action
//     public setData(fields: FieldsState<TFields>): void {
//         this.state.fields = { ...this.state.fields, ...fields };
//     }
//
//     @action
//     public setFetchStatus(status: FetchStatus): void {
//         this.state.fetchStatus = status;
//     }
//
//     @action
//     private setSubmitted(submitted: boolean) {
//         this.state.submitted = submitted;
//     }
//
//     @action
//     public resetForm(params?: { clearFields: boolean }): void {
//         this.state.submitted = false;
//         this.state.valid = false;
//
//         this.state.errors = {};
//         this.state.fetchStatus = "init";
//         this.state.touched = new Set();
//
//         if (params && params.clearFields) {
//             this.state.fields = this.generateFields();
//         }
//     }
//
//     @action
//     public setErrors(errors: ErrorsState): void {
//         const err = { ...errors };
//         const keys = Object.keys(err);
//
//         for (let i = 0, { length } = keys; i < length; i++) {
//             const key = keys[i];
//
//             if (
//                 !Object.prototype.hasOwnProperty.call(this.state.fields, key) &&
//                 key !== "form"
//             ) {
//                 delete err[key];
//             }
//         }
//
//         this.state.errors = { ...this.state.errors, ...err };
//     }
//
//     public getAllFields(): FieldsState<TFields> {
//         return this.state.fields;
//     }
//
//     public getField(field: string): TFields[keyof TFields] {
//         return this.state.fields[field];
//     }
//
//     public getError(field: string): string {
//         const errors = this.state.errors[field] || [];
//         return errors.length ? errors[0] : "";
//     }
//
//     public isValid(validateOnly: string[] = []): boolean {
//         const errorKeys = Object.keys(this.state.errors);
//
//         return !errorKeys.some((field) =>
//             validateOnly.length !== 0
//                 ? validateOnly.includes(field) &&
//                   this.state.errors[field].length !== 0
//                 : this.state.errors[field].length !== 0
//         );
//     }
//
//     @computed
//     get loading(): boolean {
//         return this.state.fetchStatus === "loading";
//     }
//
//     public changeField({
//         field,
//         value,
//         trusted = false,
//         noInterceptors = false,
//     }): void {
//         if (this.fields[field].interceptor && !noInterceptors) {
//             // eslint-disable-next-line no-param-reassign
//             value = this.fields[field].interceptor({
//                 ctx: this,
//                 value,
//                 fields: this.state.fields,
//                 state: this.state,
//             });
//         }
//
//         this.setFieldValue({ field, value, trusted });
//
//         if (this.fields[field].hooks.updated) {
//             this.fields[field].hooks.updated({
//                 ctx: this,
//                 value,
//                 fields: this.state.fields,
//                 state: this.state,
//             });
//         }
//     }
//
//     public runInterceptor(payload = {}): void {
//         const { field } = payload as any;
//
//         if (!field) {
//             throw new Error("Field is required for runInterceptor action");
//         }
//
//         const value = this.fields[field].interceptor({
//             ctx: this,
//             value: this.getField(field),
//             fields: this.state.fields,
//             state: this.state,
//         });
//
//         this.setFieldValue({ field, value });
//     }
//
//     public onBlur({ field, noValidate = false }): void {
//         if (noValidate) return;
//
//         this.debouncedFieldValidators[field]();
//     }
//
//     public async submit(params: {
//         payload?: any;
//         meta?: ISubmitMeta;
//     }): Promise<void> {
//         const { meta, payload } = params || ({} as any);
//
//         if (!this.state.submitted) {
//             this.setSubmitted(true);
//         }
//
//         const validate = meta && meta.validate ? meta.validate : true;
//
//         if (validate) {
//             await this.validateAll({
//                 validateOnly: meta && meta.validateOnly,
//             });
//         }
//
//         const isValid = this.isValid(meta && meta.validateOnly);
//
//         if (validate && !isValid) return;
//
//         await this.onSubmit(payload);
//     }
//
//     public async validateAll(params): Promise<void> {
//         const { validateOnly } = params || {};
//         const { fields } = this.state;
//
//         await Promise.all(
//             Object.keys(fields)
//                 .filter((field) =>
//                     (validateOnly || []).length !== 0
//                         ? validateOnly.includes(field)
//                         : true
//                 )
//                 .map((field) => this.validate(field))
//         );
//     }
//
//     public async validate(field: string): Promise<void> {
//         const value = this.getField(field);
//         const errors = this.validateField(field, value, this.state.fields);
//
//         if (
//             typeof this.getError(field) === "undefined" &&
//             errors.length === 0
//         ) {
//             return;
//         }
//
//         this.setErrors({ [field]: errors, form: [] });
//     }
//
//     public clearErrors(field: string): void {
//         this.setErrors({
//             [field]: [],
//             form: [],
//         });
//     }
//
//     @action
//     private getDefaultState(): IFormState<TFields> {
//         return {
//             submitted: false,
//             valid: false,
//             fetchStatus: "init",
//             touched: new Set(),
//             errors: {},
//             fields: this.generateFields(),
//         };
//     }
//
//     private generateFields(): FieldsState<TFields> {
//         const fields = Object.keys(this.fields);
//         const hash = {};
//
//         for (let i = 0, { length } = fields; i < length; i++) {
//             const fieldName = fields[i];
//             const field = this.fields[fieldName];
//
//             hash[fieldName] =
//                 (this.defaultValues && this.defaultValues[fieldName]) ||
//                 this.getFieldDefaultValue(field.type);
//         }
//
//         return hash;
//     }
//
//     private getFieldDefaultValue(type: FieldTypes): string | number | boolean {
//         if (!type) {
//             throw new Error("Type is required");
//         }
//
//         return (type as any)();
//     }
//
//     private validateField(
//         field: string,
//         value: any,
//         fields: Hash<any>
//     ): string[] {
//         const fieldConfig = this.fields[field];
//         const { validators } = fieldConfig || {};
//
//         if (!validators) {
//             return [];
//         }
//
//         for (const validator of validators || []) {
//             if (typeof validator !== "function") {
//                 throw new Error("Validator should be function.");
//             }
//
//             let result;
//
//             try {
//                 result = validator(value, fields);
//             } catch (e) {
//                 console.error(e);
//             }
//
//             if (result) {
//                 if (typeof result !== "string") {
//                     throw new Error(
//                         "Validator should return string if invalid."
//                     );
//                 }
//
//                 return [result];
//             }
//         }
//
//         return [];
//     }
// }
