/** 차종 코드 → 라벨 */
export const VTYPE_LABEL = { 1: '렌트카', 2: '화물', 3: '버스' }

export const VTYPE_OPTIONS = Object.entries(VTYPE_LABEL)
    .map(([value, label]) => ({ value, label }))

/** ETAS 차종 코드 → 라벨 */
export const ETAS_TYPE_LABEL = {
    11: '시내버스', 12: '농어촌버스', 13: '마을버스', 14: '시외버스',
    15: '고속버스', 16: '전세버스', 17: '특수여객자동차',
    21: '일반택시', 22: '개인택시',
    31: '일반화물자동차', 32: '개별화물자동차',
    41: '비사업용자동차', 51: '어린이통학버스',
    98: '기타1', 99: '기타2',
}

/** select/filter용 옵션 배열 */
export const ETAS_TYPE_OPTIONS = Object.entries(ETAS_TYPE_LABEL)
    .map(([value, label]) => ({ value, label }))

/** 연료 코드 → 라벨 */
export const FUEL_LABEL = { 0: 'NONE', 1: '경유', 2: '휘발유', 3: '전기' }

export const FUEL_OPTIONS = [
    { value: '0', label: 'NONE' },
    { value: '1', label: '경유' },
    { value: '2', label: '휘발유' },
    { value: '3', label: '전기' },
]
