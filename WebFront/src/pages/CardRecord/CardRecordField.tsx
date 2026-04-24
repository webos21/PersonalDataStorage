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
        "name": "cardId",
        "label": "카드",
        "type": "select",
        "required": true
    },
    {
        "name": "transactionDate",
        "label": "거래일",
        "type": "datetime-local",
        "required": true
    },
    {
        "name": "title",
        "label": "적요",
        "type": "text",
        "required": true,
        "maxLength": 255
    },
    {
        "name": "price",
        "label": "결제금액",
        "type": "number",
        "min": 0
    },
    {
        "name": "commission",
        "label": "수수료",
        "type": "number",
        "min": 0
    },
    {
        "name": "settlementDate",
        "label": "납부일",
        "type": "date"
    },
    {
        "name": "accountCode",
        "label": "계정코드",
        "type": "text"
    },
    {
        "name": "installmentId",
        "label": "할부 ID",
        "type": "number",
        "min": 0
    },
    {
        "name": "installmentTurn",
        "label": "할부회차",
        "type": "number",
        "min": 0
    },
    {
        "name": "amount",
        "label": "납부금액",
        "type": "number",
        "min": 0
    },
    {
        "name": "remainder",
        "label": "잔여금액",
        "type": "number",
        "min": 0
    },
    {
        "name": "memo",
        "label": "메모",
        "type": "textarea"
    }
];

export type { FieldOption, FieldType, FieldDef };
