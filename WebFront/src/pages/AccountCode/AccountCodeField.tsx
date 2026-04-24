type FieldOption = { value: string; label: string };
type FieldType = 'text' | 'tel' | 'email' | 'url' | 'password' | 'number' | 'date' | 'month' | 'datetime-local' | 'textarea' | 'select';
type FieldDef = {
    name: string;
    label: string;
    type?: FieldType;
    required?: boolean;
    placeholder?: string;
    maxLength?: number;
    min?: number;
    max?: number;
    options?: FieldOption[];
};

export const FIELD_CONFIG: FieldDef[] = [
    {
        name: 'accountCode',
        label: '계정코드',
        type: 'text',
        required: true,
        maxLength: 2,
        placeholder: '01'
    },
    {
        name: 'title',
        label: '코드명',
        type: 'text',
        required: true,
        maxLength: 255,
        placeholder: '식비'
    }
];

export type { FieldOption, FieldType, FieldDef };
