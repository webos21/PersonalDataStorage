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
        "name": "fullName",
        "label": "이름",
        "type": "text",
        "required": true,
        "maxLength": 60,
        "placeholder": "이름을 입력해 주세요."
    },
    {
        "name": "mobile",
        "label": "핸드폰",
        "type": "tel",
        "placeholder": "핸드폰을 입력해 주세요."
    },
    {
        "name": "category",
        "label": "분류",
        "type": "text",
        "placeholder": "분류를 입력해 주세요."
    },
    {
        "name": "telephone",
        "label": "전화번호",
        "type": "tel",
        "placeholder": "전화번호를 입력해 주세요."
    },
    {
        "name": "fax",
        "label": "FAX번호",
        "type": "tel",
        "placeholder": "FAX번호를 입력해 주세요."
    },
    {
        "name": "email",
        "label": "전자우편",
        "type": "email",
        "placeholder": "전자우편을 입력해 주세요."
    },
    {
        "name": "homepage",
        "label": "홈페이지",
        "type": "url",
        "placeholder": "홈페이지 주소를 입력해 주세요."
    },
    {
        "name": "postcode",
        "label": "우편번호",
        "type": "text",
        "placeholder": "우편번호를 입력해 주세요."
    },
    {
        "name": "address",
        "label": "주소",
        "type": "text",
        "placeholder": "주소를 입력해 주세요."
    },
    {
        "name": "memo",
        "label": "메모",
        "type": "textarea",
        "placeholder": "메모를 입력해 주세요."
    }
];

export type { FieldOption, FieldType, FieldDef };
