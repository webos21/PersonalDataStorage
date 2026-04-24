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
        "name": "budgetDate",
        "label": "예산월",
        "type": "month",
        "required": true
    },
    {
        "name": "accountCode",
        "label": "계정코드",
        "type": "text"
    },
    {
        "name": "deposit",
        "label": "입금액",
        "type": "number",
        "min": 0
    },
    {
        "name": "withdrawal",
        "label": "출금액",
        "type": "number",
        "min": 0
    },
    {
        "name": "memo",
        "label": "메모",
        "type": "textarea"
    }
];

export type { FieldOption, FieldType, FieldDef };
