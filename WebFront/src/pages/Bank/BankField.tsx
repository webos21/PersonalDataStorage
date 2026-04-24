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
        "name": "bankName",
        "label": "은행명",
        "type": "text",
        "required": true,
        "maxLength": 60,
        "placeholder": "은행명을 입력해 주세요."
    },
    {
        "name": "accountName",
        "label": "계좌명",
        "type": "text",
        "required": true,
        "maxLength": 60,
        "placeholder": "계좌명을 입력해 주세요."
    },
    {
        "name": "holder",
        "label": "소유주",
        "type": "text",
        "maxLength": 60,
        "placeholder": "소유주를 입력해 주세요."
    },
    {
        "name": "accountNumber",
        "label": "계좌번호",
        "type": "text",
        "maxLength": 30,
        "placeholder": "계좌번호를 입력해 주세요."
    },
    {
        "name": "initialBalance",
        "label": "초기잔고",
        "type": "number",
        "min": 0,
        "placeholder": "초기잔고를 입력해 주세요."
    },
    {
        "name": "accountPassword",
        "label": "비밀번호",
        "type": "password",
        "maxLength": 20,
        "placeholder": "비밀번호를 입력해 주세요."
    },
    {
        "name": "issueDate",
        "label": "발행일",
        "type": "date"
    },
    {
        "name": "expireDate",
        "label": "만기일",
        "type": "date"
    },
    {
        "name": "arrange",
        "label": "배열순서",
        "type": "number",
        "min": 0,
        "placeholder": "배열순서를 입력해 주세요."
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
        "type": "textarea",
        "placeholder": "메모를 입력해 주세요."
    }
];

export type { FieldOption, FieldType, FieldDef };
