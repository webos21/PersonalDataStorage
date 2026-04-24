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
        "label": "카드사",
        "type": "text",
        "required": true,
        "maxLength": 60
    },
    {
        "name": "cardName",
        "label": "카드명",
        "type": "text",
        "required": true,
        "maxLength": 60
    },
    {
        "name": "cardNumber",
        "label": "카드번호",
        "type": "text",
        "required": true,
        "maxLength": 30
    },
    {
        "name": "cardPassword",
        "label": "비밀번호",
        "type": "password",
        "maxLength": 20
    },
    {
        "name": "validYear",
        "label": "유효년도",
        "type": "text",
        "maxLength": 4
    },
    {
        "name": "validMonth",
        "label": "유효월",
        "type": "text",
        "maxLength": 2
    },
    {
        "name": "chargeDate",
        "label": "결제일",
        "type": "number",
        "min": 1,
        "max": 31
    },
    {
        "name": "cvcNumber",
        "label": "CVC번호",
        "type": "number",
        "min": 0
    },
    {
        "name": "creditLimit",
        "label": "카드한도",
        "type": "number",
        "min": 0
    },
    {
        "name": "cashAdvance",
        "label": "현금한도",
        "type": "number",
        "min": 0
    },
    {
        "name": "cardLoan",
        "label": "카드론",
        "type": "number",
        "min": 0
    },
    {
        "name": "issueDate",
        "label": "발행일",
        "type": "date"
    },
    {
        "name": "refreshNormal",
        "label": "갱신일반",
        "type": "number",
        "min": 0
    },
    {
        "name": "refreshShort",
        "label": "갱신단축",
        "type": "number",
        "min": 0
    },
    {
        "name": "bankId",
        "label": "은행ID",
        "type": "number",
        "min": 1
    },
    {
        "name": "arrange",
        "label": "배열순서",
        "type": "number",
        "min": 0
    },
    {
        "name": "notUsed",
        "label": "사용여부",
        "type": "select",
        "required": true,
        "options": [
            {
                "value": "0",
                "label": "사용중"
            },
            {
                "value": "1",
                "label": "미사용"
            }
        ]
    },
    {
        "name": "memo",
        "label": "메모",
        "type": "textarea"
    }
];

export type { FieldOption, FieldType, FieldDef };
