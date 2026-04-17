/**
 * Format Utility
 * - KST 고정 날짜/시간 포맷 및 날짜 계산 유틸
 * - 브라우저 로컬 timezone에 의존하지 않도록 wall time 문자열은 직접 파싱
 */

const KST_TIME_ZONE = 'Asia/Seoul'
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/
const DATETIME_RE = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,9})?)?)?$/
const DAY_MS = 24 * 60 * 60 * 1000

const pad2 = (value) => String(value).padStart(2, '0')

const getPart = (parts, type) => parts.find(part => part.type === type)?.value ?? ''

const getKstPartsFromDate = (date) => {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: KST_TIME_ZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).formatToParts(date)

    return {
        year: getPart(parts, 'year'),
        month: getPart(parts, 'month'),
        day: getPart(parts, 'day'),
        hour: getPart(parts, 'hour'),
        minute: getPart(parts, 'minute'),
        second: getPart(parts, 'second'),
        hasTime: true,
    }
}

const parseDateParts = (value) => {
    if (typeof value !== 'string') return null
    const match = DATE_RE.exec(value.trim())
    if (!match) return null

    return {
        year: Number(match[1]),
        month: Number(match[2]),
        day: Number(match[3]),
    }
}

const parseDateTimeParts = (value) => {
    if (value === null || value === undefined || value === '') return null

    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : getKstPartsFromDate(value)
    }

    if (typeof value === 'number') {
        const date = new Date(value)
        return Number.isNaN(date.getTime()) ? null : getKstPartsFromDate(date)
    }

    if (typeof value !== 'string') return null

    const normalized = value.trim()
    const directMatch = DATETIME_RE.exec(normalized)
    if (directMatch) {
        return {
            year: directMatch[1],
            month: directMatch[2],
            day: directMatch[3],
            hour: directMatch[4] ?? '00',
            minute: directMatch[5] ?? '00',
            second: directMatch[6] ?? '00',
            hasTime: Boolean(directMatch[4]),
        }
    }

    const parsed = new Date(normalized)
    if (Number.isNaN(parsed.getTime())) return null

    return getKstPartsFromDate(parsed)
}

export const toKstDateString = (value = new Date()) => {
    const parts = parseDateTimeParts(value)
    if (!parts) return ''
    return `${parts.year}-${parts.month}-${parts.day}`
}

export const shiftDateKST = (dateString, deltaDays) => {
    const base = parseDateParts(toKstDateString(dateString))
    if (!base) return ''

    const shifted = new Date(Date.UTC(base.year, base.month - 1, base.day) + (deltaDays * DAY_MS))
    return `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`
}

export const diffDateKST = (startDate, endDate) => {
    const start = parseDateParts(toKstDateString(startDate))
    const end = parseDateParts(toKstDateString(endDate))
    if (!start || !end) return NaN

    const startUtc = Date.UTC(start.year, start.month - 1, start.day)
    const endUtc = Date.UTC(end.year, end.month - 1, end.day)
    return Math.floor((endUtc - startUtc) / DAY_MS)
}

export const getTodayKST = () => toKstDateString(new Date())

export const getDateDaysAgoKST = (daysAgo) => shiftDateKST(getTodayKST(), -daysAgo)

export const formatDateOnly = (value) => {
    const parts = parseDateTimeParts(value)
    if (!parts) return '-'
    return `${parts.year}.${parts.month}.${parts.day}`
}

export const formatTime = (value) => {
    const parts = parseDateTimeParts(value)
    if (!parts || !parts.hasTime) return '-'
    return `${parts.hour}:${parts.minute}`
}

export const formatDate = (value) => {
    const parts = parseDateTimeParts(value)
    if (!parts) return '-'

    const date = `${parts.year}.${parts.month}.${parts.day}`
    return parts.hasTime
        ? `${date} ${parts.hour}:${parts.minute}:${parts.second}`
        : date
}

export const formatDateTime = formatDate

// Format: 1,000,000
export const formatNumber = (number) => {
    if (number === null || number === undefined) return '-'
    return new Intl.NumberFormat('ko-KR').format(number)
}

// Format Duration: 1h 30m 20s
export const formatDuration = (seconds) => {
    if (!seconds) return '0s'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    const parts = []
    if (h > 0) parts.push(`${h}h`)
    if (m > 0) parts.push(`${m}m`)
    if (s > 0 || parts.length === 0) parts.push(`${s}s`)

    return parts.join(' ')
}
