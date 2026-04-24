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
        "label": "보험사",
        "type": "text",
        "required": true,
        "maxLength": 60
    },
    {
        "name": "product",
        "label": "상품명",
        "type": "text",
        "required": true,
        "maxLength": 80
    },
    {
        "name": "insuranceType",
        "label": "보험종류",
        "type": "text"
    },
    {
        "name": "policyType",
        "label": "정책형태",
        "type": "text"
    },
    {
        "name": "contractId",
        "label": "계약번호",
        "type": "text",
        "maxLength": 60
    },
    {
        "name": "policyHolder",
        "label": "보험소유",
        "type": "text",
        "maxLength": 60
    },
    {
        "name": "insured",
        "label": "피보험자",
        "type": "text",
        "maxLength": 60
    },
    {
        "name": "payCountTotal",
        "label": "총납입수",
        "type": "number",
        "min": 0
    },
    {
        "name": "payCountDone",
        "label": "납입회차",
        "type": "number",
        "min": 0
    },
    {
        "name": "premiumVolume",
        "label": "납입금액",
        "type": "number",
        "min": 0
    },
    {
        "name": "premiumMode",
        "label": "납입방법",
        "type": "text"
    },
    {
        "name": "contractDate",
        "label": "계약일자",
        "type": "date"
    },
    {
        "name": "maturityDate",
        "label": "만료일자",
        "type": "date"
    },
    {
        "name": "arranger",
        "label": "계약담당",
        "type": "text",
        "maxLength": 60
    },
    {
        "name": "contractStatus",
        "label": "계약상태",
        "type": "select",
        "required": true,
        "options": [
            {
                "value": "0",
                "label": "정지"
            },
            {
                "value": "1",
                "label": "유지"
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
