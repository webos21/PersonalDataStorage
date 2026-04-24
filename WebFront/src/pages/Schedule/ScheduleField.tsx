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
        "name": "title",
        "label": "제목",
        "type": "text",
        "required": true,
        "maxLength": 255,
        "placeholder": "제목을 입력해 주세요."
    },
    {
        "name": "pdate",
        "label": "계획일시",
        "type": "datetime-local",
        "required": true
    },
    {
        "name": "readOk",
        "label": "확인여부",
        "type": "select",
        "required": true,
        "options": [
            {
                "value": "0",
                "label": "미확인"
            },
            {
                "value": "1",
                "label": "확인완료"
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
