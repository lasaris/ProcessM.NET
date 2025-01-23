export enum DeclareConstraintType {
    RELATIONAL,
    EXISTENTIAL,
    NOT_RELATIONAL,
}

export type DeclareConstraint = {
    template: string;
    name: string;
    description: string;
    ltlExpression: string;
    type: string;
};
