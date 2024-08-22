export enum ModelType {
    IMPERATIVE,
    DECLARATIVE,
}

export type Model = {
    name: string;
    size: string;
    modified: string;
    type: ModelType;
};
