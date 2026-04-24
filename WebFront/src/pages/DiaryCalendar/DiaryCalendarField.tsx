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
        "maxLength": 255
    },
    {
        "name": "wdate",
        "label": "작성일",
        "type": "date",
        "required": true
    },
    {
        "name": "weather",
        "label": "날씨",
        "type": "select",
        "required": true,
        "options": [
            {
                "value": "0",
                "label": "눈"
            },
            {
                "value": "1",
                "label": "맑음"
            },
            {
                "value": "2",
                "label": "구름조금"
            },
            {
                "value": "3",
                "label": "흐림"
            },
            {
                "value": "4",
                "label": "비온뒤갬"
            },
            {
                "value": "5",
                "label": "비"
            }
        ]
    },
    {
        "name": "content",
        "label": "내용",
        "type": "textarea",
        "required": true,
        "maxLength": 4000
    }
];

export type { FieldOption, FieldType, FieldDef };
