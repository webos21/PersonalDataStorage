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
        "name": "siteUrl",
        "label": "URL",
        "type": "url",
        "required": true,
        "maxLength": 255,
        "placeholder": "URL을 입력해 주세요."
    },
    {
        "name": "siteName",
        "label": "사이트명",
        "type": "text",
        "required": true,
        "maxLength": 100,
        "placeholder": "사이트명을 입력해 주세요."
    },
    {
        "name": "siteType",
        "label": "유형",
        "type": "text",
        "maxLength": 60,
        "placeholder": "유형을 입력해 주세요."
    },
    {
        "name": "myId",
        "label": "아이디",
        "type": "text",
        "required": true,
        "maxLength": 100,
        "placeholder": "아이디를 입력해 주세요."
    },
    {
        "name": "myPw",
        "label": "비밀번호",
        "type": "password",
        "required": true,
        "maxLength": 100,
        "placeholder": "비밀번호를 입력해 주세요."
    },
    {
        "name": "regDate",
        "label": "가입일자",
        "type": "date"
    },
    {
        "name": "memo",
        "label": "메모",
        "type": "textarea"
    }
];

export type { FieldOption, FieldType, FieldDef };
