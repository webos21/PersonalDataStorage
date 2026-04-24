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
        "name": "estateType",
        "label": "자산유형",
        "type": "text",
        "required": true,
        "maxLength": 60
    },
    {
        "name": "title",
        "label": "자산이름",
        "type": "text",
        "required": true,
        "maxLength": 80
    },
    {
        "name": "holder",
        "label": "소유자명",
        "type": "text",
        "maxLength": 60
    },
    {
        "name": "estimate",
        "label": "예상가격",
        "type": "number",
        "min": 0
    },
    {
        "name": "loan",
        "label": "담보대출",
        "type": "number",
        "min": 0
    },
    {
        "name": "acquisitionDate",
        "label": "취득일자",
        "type": "date"
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
