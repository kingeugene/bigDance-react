export interface HookContext<TFields> {
    ctx: any;
    value: any;
    fields: FieldsState<TFields>;
    state: any;
}
export interface IFieldConfig<TFields> {
    type:
        | StringConstructor
        | NumberConstructor
        | BooleanConstructor
        | ObjectConstructor;
    validators?: Validator[];
    interceptor?(params: HookContext<TFields>): any;
    hooks?: {
        updated?(params: HookContext<TFields>): any;
    };
}

export interface IFormState<TFields> {
    submitted: boolean;
    valid: boolean;
    fetchStatus: FetchStatus;
    touched: Set<keyof TFields>;
    fields: FieldsState<TFields>;
    errors: ErrorsState;
}

export interface IFormOptions<TField> {
    fields: FieldsHash<TField>;
    defaultValues?: DefaultValues;
    debounce?: number;
    onSubmit(payload: any): void;
}

export interface ISubmitMeta {
    validate?: boolean;
    validateOnly?: string[];
}

export type FieldsHash<TFields> = {
    [K in keyof TFields]: IFieldConfig<TFields>;
};

export type ErrorsState = Hash<string[]>;

export type FieldsState<
    TFields,
    K extends keyof TFields = keyof TFields
> = Hash<TFields[K]>;

export type DefaultValues = { [field: string]: any };

export type FieldTypes = string | number | boolean | Record<string, unknown>;

export type Validator = (value, fields: Hash<any>) => void | string;
