export enum DeclareConstraintType {
    RELATIONAL,
    EXISTENTIAL,
    NOT_RELATIONAL,
}

export type DeclareConstraint = {
    name: string;
    description: string;
    ltlExpression: string;
    type: DeclareConstraintType;
};

export const DeclareConstraints: DeclareConstraint[] = [
    {
        name: 'Absence',
        type: DeclareConstraintType.RELATIONAL,
        description: 'A occurs at most n - 1 times',
        ltlExpression: '!existence(n, A)',
    },
    {
        name: 'Alternate Precedence',
        type: DeclareConstraintType.RELATIONAL,
        description:
            'Each time B occurs, it is preceded by A and no other B can recur in between',
        ltlExpression:
            'precedence(A, B) && subsequent(B => next(precedence(A, B)))',
    },
    {
        name: 'Alternate Response',
        type: DeclareConstraintType.RELATIONAL,
        description:
            'Each time A occurs, then B occurs afterwards, before A recurs',
        ltlExpression: 'subsequent(A => next(!A U B))',
    },
    {
        name: 'Alternate Succession',
        type: DeclareConstraintType.RELATIONAL,
        description:
            'A and B occur if and only if the latter follows the former, and they alternate each other',
        ltlExpression: 'AlternateResponse(A, B) && AlternatePrecedence(A, B)',
    },
    {
        name: 'Chain Precedence',
        type: DeclareConstraintType.RELATIONAL,
        description: 'Each time B occurs, then A occurs immediately before',
        ltlExpression: 'subsequent(next(B) => A)',
    },
    {
        name: 'Chain Response',
        type: DeclareConstraintType.RELATIONAL,
        description: 'Each time A occurs, then B occurs immediately after',
        ltlExpression: 'subsequent(A => next(B))',
    },
    {
        name: 'Chain Succession',
        type: DeclareConstraintType.RELATIONAL,
        description:
            'A and B occur if and only if the latter immediatelly follows the former',
        ltlExpression: 'subsequent(A <=> next(B))',
    },
    {
        name: 'Coexistence',
        type: DeclareConstraintType.RELATIONAL,
        description: 'If B occurs, then A occurs, and vice versa',
        ltlExpression: 'eventual(A) <=> eventual(B)',
    },
    {
        name: 'Precedence',
        type: DeclareConstraintType.RELATIONAL,
        description: 'B occurs only if preceded by A',
        ltlExpression: '(!B U A) || subsequent(!B)',
    },
    {
        name: 'Responded Existence',
        type: DeclareConstraintType.RELATIONAL,
        description: 'A is the first to occur',
        ltlExpression: 'A',
    },
    {
        name: 'Response',
        type: DeclareConstraintType.RELATIONAL,
        description: 'If A occurs, then B occurs after A',
        ltlExpression: 'subsequent(A => eventual(B))',
    },
    {
        name: 'Succession',
        type: DeclareConstraintType.RELATIONAL,
        description: 'A occurs if and only if B occurs after A',
        ltlExpression: 'response(A, B) && precedence(A, B)',
    },
    {
        name: 'Exactly',
        type: DeclareConstraintType.EXISTENTIAL,
        description: 'A occurs exactly n times',
        ltlExpression: 'existence(n, A) && absence(n + 1, A)',
    },
    {
        name: 'Existence',
        type: DeclareConstraintType.EXISTENTIAL,
        description: 'A occurs at least n times',
        ltlExpression: '◇(A && ◯(Existence(n-1, A))) ◇(A)',
    },
    {
        name: 'Init',
        type: DeclareConstraintType.EXISTENTIAL,
        description: 'A is the first to occur',
        ltlExpression: 'A',
    },
    {
        name: 'Not Chain Succession',
        type: DeclareConstraintType.NOT_RELATIONAL,
        description:
            'A and B occur if and only if the latter does not immediately follow the former',
        ltlExpression: 'subsequent(A => next(!B))',
    },
    {
        name: 'Not Coexistence',
        type: DeclareConstraintType.NOT_RELATIONAL,
        description: 'A and B never occur together',
        ltlExpression: '!(eventual(A) && eventual(B))',
    },
    {
        name: 'Not Succession',
        type: DeclareConstraintType.NOT_RELATIONAL,
        description: 'A never occurs before B',
        ltlExpression: 'subsequent(A => !eventual(B))',
    },
];
