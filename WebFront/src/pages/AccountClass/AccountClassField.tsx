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
        name: 'id',
        label: '계정 분류',
        type: 'number',
        required: true,
        min: 1,
        placeholder: '1'
    },
    {
        name: 'title',
        label: '분류 명칭',
        type: 'text',
        required: true,
        maxLength: 255,
        placeholder: '수입'
    }
];

export type { FieldOption, FieldType, FieldDef };
