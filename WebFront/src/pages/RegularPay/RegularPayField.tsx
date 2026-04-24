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
        "name": "accountCode",
        "label": "계정코드",
        "type": "text"
    },
    {
        "name": "title",
        "label": "정기납명",
        "type": "text",
        "required": true,
        "maxLength": 255
    },
    {
        "name": "wdate",
        "label": "등록일",
        "type": "date",
        "required": true
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
        "name": "monthDay",
        "label": "정기납일",
        "type": "number",
        "min": 1,
        "max": 31
    },
    {
        "name": "sdate",
        "label": "납입시작",
        "type": "date"
    },
    {
        "name": "edate",
        "label": "납입종료",
        "type": "date"
    },
    {
        "name": "memo",
        "label": "메모",
        "type": "textarea"
    }
];

export type { FieldOption, FieldType, FieldDef };
