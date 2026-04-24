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
        "name": "adate",
        "label": "적용일",
        "type": "text",
        "required": true,
        "placeholder": "적용일을 입력해 주세요. (MMDD 4자리)"
    },
    {
        "name": "lunar",
        "label": "음력여부",
        "type": "select",
        "required": true,
        "options": [
            {
                "value": "0",
                "label": "양력"
            },
            {
                "value": "1",
                "label": "음력"
            }
        ]
    },
    {
        "name": "holiday",
        "label": "휴일여부",
        "type": "select",
        "required": true,
        "options": [
            {
                "value": "0",
                "label": "아니오"
            },
            {
                "value": "1",
                "label": "예"
            }
        ]
    }
];

export type { FieldOption, FieldType, FieldDef };
