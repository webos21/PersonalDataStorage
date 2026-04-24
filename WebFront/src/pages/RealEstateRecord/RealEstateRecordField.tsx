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
        "name": "realEstateId",
        "label": "부동산ID",
        "type": "number",
        "min": 1
    },
    {
        "name": "transactionDate",
        "label": "거래일",
        "type": "date",
        "required": true
    },
    {
        "name": "title",
        "label": "적요",
        "type": "text",
        "required": true,
        "maxLength": 255
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
