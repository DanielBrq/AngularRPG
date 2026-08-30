export const CharactersMetadata = {
    SURVIVOR: {
        id: '01a03ba8-474f-724e-9741-e47a57ed2325',
        name: 'Survivor',
    },
    WARRIOR: {
        id: '01a03ba9-5ffe-769a-aaa2-ad2e4f207087',
        name: 'Warrior',
    },
    WIZARD: {
        id: '01a03ba9-7284-72ae-9d30-a8ce6c77d500',
        name: 'Wizard',
    },
    LIBERATOR: {
        id: '01a03ba9-823c-758b-9995-f94c5c3e9638',
        name: 'Liberator',
    },
    SCHOLAR: {
        id: '01a03ba9-916d-76db-8340-15051c48d4ec',
        name: 'Scholar',
    }
} as const;
export type CharacterLabelType = typeof CharactersMetadata[keyof typeof CharactersMetadata];