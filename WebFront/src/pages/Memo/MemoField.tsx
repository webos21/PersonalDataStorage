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
        "name": "wdate",
        "label": "작성일",
        "type": "date"
    },
    {
        "name": "content",
        "label": "내용",
        "type": "textarea",
        "required": true,
        "maxLength": 4000,
        "placeholder": "내용을 입력해 주세요."
    }
];

export type { FieldOption, FieldType, FieldDef };
