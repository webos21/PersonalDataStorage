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
        "name": "company",
        "label": "증권사",
        "type": "text",
        "required": true,
        "maxLength": 60
    },
    {
        "name": "accountName",
        "label": "계좌명",
        "type": "text",
        "required": true,
        "maxLength": 60
    },
    {
        "name": "accountNumber",
        "label": "계좌번호",
        "type": "text",
        "required": true,
        "maxLength": 30
    },
    {
        "name": "holder",
        "label": "소유주",
        "type": "text",
        "maxLength": 60
    },
    {
        "name": "deposit",
        "label": "예탁금액",
        "type": "number",
        "min": 0
    },
    {
        "name": "estimate",
        "label": "산정금액",
        "type": "number",
        "min": 0
    },
    {
        "name": "estimateDate",
        "label": "산정일자",
        "type": "date"
    },
    {
        "name": "arrange",
        "label": "배열순서",
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
