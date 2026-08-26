export const CharacterLabelType = {
    SURVIVOR: {
        id: '01a03ba8-474f-724e-9741-e47a57ed2325',
        name: 'Eira',
        code_name: 'survivor',
    },
    WARRIOR: {
        id: '01a03ba9-5ffe-769a-aaa2-ad2e4f207087',
        name: 'Aidan',
        code_name: 'warrior',
    },
    WIZARD: {
        id: '01a03ba9-7284-72ae-9d30-a8ce6c77d500',
        name: 'Rhegor',
        code_name: 'wizard',
    },
    LIBERATOR: {
        id: '01a03ba9-823c-758b-9995-f94c5c3e9638',
        name: 'Arumi',
        code_name: 'liberator',
    },
    SCHOLAR: {
        id: '01a03ba9-916d-76db-8340-15051c48d4ec',
        name: 'Kaeri',
        code_name: 'scholar',
    }
} as const;
export type CharacterLabelType = typeof CharacterLabelType[keyof typeof CharacterLabelType];