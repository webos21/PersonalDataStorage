import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Notebook, Plus } from 'lucide-react';
import PageLayout from '@/shared/ui/layout/PageLayout';
import PageHeader from '@/shared/ui/layout/PageHeader';
import Button from '@/shared/ui/button/Button';
import { solar2lunar } from '@/shared/utils2/DateUtil';
import DiaryCalendarForm, { FIELD_CONFIG as DiaryCalendarFieldConfig } from './DiaryCalendarForm';
import anniversaryApi from '@/pages/Anniversary/api';
import api from './api';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const WEATHER_META: Record<string, { emoji: string; label: string }> = {
    '0': { emoji: '❄️', label: '눈' },
    '1': { emoji: '☀️', label: '맑음' },
    '2': { emoji: '⛅', label: '구름조금' },
    '3': { emoji: '☁️', label: '흐림' },
    '4': { emoji: '🌦️', label: '비온뒤갬' },
    '5': { emoji: '🌧️', label: '비' }
};

type AnniversaryItem = {
    id?: number | string;
    title?: string;
    applyDate?: string;
    lunar?: number | string;
    holiday?: number | string;
};

type AnniversaryBadge = {
    title: string;
    holiday: boolean;
};

const toDayKey = (date: Date) => {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${d}`;
};

const parseDateSafe = (raw: any) => {
    if (!raw) return null;
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed;
};

const toLunarKey = (year: number, month: number, day: number) => `${year}-${month}-${day}`;

const buildAnniversaryByDay = (calendarDays: Date[], anniversaries: AnniversaryItem[]) => {
    const map: Record<string, AnniversaryBadge[]> = {};
    if (calendarDays.length === 0 || anniversaries.length === 0) return map;

    const rangeStart = new Date(calendarDays[0].getFullYear(), calendarDays[0].getMonth(), calendarDays[0].getDate());
    const rangeEndExclusive = new Date(
        calendarDays[calendarDays.length - 1].getFullYear(),
        calendarDays[calendarDays.length - 1].getMonth(),
        calendarDays[calendarDays.length - 1].getDate() + 1
    );

    const lunarCalendar: Record<string, Date> = {};
    for (let time = rangeStart.getTime(); time < rangeEndExclusive.getTime(); time += 86400000) {
        const solarDate = new Date(time);
        const lunarDate = solar2lunar(solarDate);
        lunarCalendar[toLunarKey(lunarDate.year, lunarDate.month, lunarDate.day)] = solarDate;
    }

    const lunarStartBase = solar2lunar(rangeStart);
    const lunarEndBase = solar2lunar(rangeEndExclusive);
    const lunarStart = new Date(lunarStartBase.year, lunarStartBase.month, lunarStartBase.day);
    const lunarEnd = new Date(lunarEndBase.year, lunarEndBase.month, lunarEndBase.day);
    const lunarYearDiff = lunarStartBase.year !== lunarEndBase.year;
    const solarYearDiff = rangeStart.getFullYear() !== rangeEndExclusive.getFullYear();

    anniversaries.forEach((anni) => {
        const rawApplyDate = `${anni?.applyDate ?? ''}`.padStart(4, '0');
        if (!/^\d{4}$/.test(rawApplyDate)) return;

        const dataMon = Number.parseInt(rawApplyDate.slice(0, 2), 10) - 1;
        const dataDay = Number.parseInt(rawApplyDate.slice(2, 4), 10);
        if (Number.isNaN(dataMon) || Number.isNaN(dataDay) || dataMon < 0 || dataMon > 11 || dataDay < 1 || dataDay > 31) return;

        const isLunar = Number(anni?.lunar ?? 0) === 1;
        const isHoliday = Number(anni?.holiday ?? 0) === 1;
        const titleText = `${anni?.title ?? '기념일'}`.trim();
        let targetDate: Date | null = null;
        let viewTitle = titleText;

        if (isLunar) {
            let yearVal = lunarEnd.getFullYear();
            if (lunarYearDiff && dataMon === 11) yearVal -= 1;
            let lunarDate = new Date(yearVal, dataMon, dataDay);
            if (lunarDate < lunarStart || lunarDate >= lunarEnd) return;

            let foundSolar = lunarCalendar[toLunarKey(lunarDate.getFullYear(), lunarDate.getMonth(), lunarDate.getDate())];
            if (!foundSolar) {
                lunarDate = new Date(yearVal, dataMon, dataDay - 1);
                foundSolar = lunarCalendar[toLunarKey(lunarDate.getFullYear(), lunarDate.getMonth(), lunarDate.getDate())];
            }
            if (!foundSolar) {
                lunarDate = new Date(yearVal, dataMon, dataDay - 2);
                foundSolar = lunarCalendar[toLunarKey(lunarDate.getFullYear(), lunarDate.getMonth(), lunarDate.getDate())];
            }
            if (!foundSolar) return;

            targetDate = foundSolar;
            viewTitle = `${titleText}(음 ${lunarDate.getMonth() + 1}.${lunarDate.getDate()})`;
        } else {
            let yearVal = rangeEndExclusive.getFullYear();
            if (solarYearDiff && dataMon === 11) yearVal -= 1;
            const solarDate = new Date(yearVal, dataMon, dataDay);
            if (solarDate < rangeStart || solarDate >= rangeEndExclusive) return;
            targetDate = solarDate;
        }

        const dayKey = toDayKey(targetDate);
        if (!map[dayKey]) map[dayKey] = [];
        map[dayKey].push({ title: viewTitle, holiday: isHoliday });
    });

    return map;
};

const DiaryCalendar = () => {
    const [keyword, setKeyword] = useState('');
    const [currentMonth, setCurrentMonth] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });
    const [formState, setFormState] = useState<{ open: boolean; mode: 'add' | 'edit' | 'delete'; currentData: any }>({
        open: false,
        mode: 'add',
        currentData: {}
    });

    const viewYear = currentMonth.getFullYear();
    const viewMonth = currentMonth.getMonth() + 1;

    const { data: listResult, isLoading } = api.useList(1, 500, keyword || undefined, {
        year: viewYear,
        month: viewMonth
    });
    const rows = listResult?.data || [];
    const { data: anniversaryResult } = anniversaryApi.useList(1, 1000, undefined);
    const anniversaries: AnniversaryItem[] = anniversaryResult?.data || [];

    const calendarDays = useMemo(() => {
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const startOffset = firstDayOfMonth.getDay();
        const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1 - startOffset);
        return Array.from({ length: 42 }, (_, idx) => {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + idx);
            return day;
        });
    }, [currentMonth]);

    const formKeys = useMemo(() => DiaryCalendarFieldConfig.map((field: any) => field.name), []);

    const filteredRows = useMemo(() => {
        const q = keyword.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter((row: any) => {
            const title = `${row?.title ?? ''}`.toLowerCase();
            const content = `${row?.content ?? ''}`.toLowerCase();
            return title.includes(q) || content.includes(q);
        });
    }, [rows, keyword]);

    const toInputDate = (date: Date) => {
        const y = date.getFullYear();
        const m = `${date.getMonth() + 1}`.padStart(2, '0');
        const d = `${date.getDate()}`.padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const entriesByDay = useMemo(() => {
        const map: Record<string, any[]> = {};
        filteredRows.forEach((row: any) => {
            const date = parseDateSafe(row?.wdate);
            if (!date) return;
            const key = toDayKey(date);
            if (!map[key]) map[key] = [];
            map[key].push(row);
        });
        return map;
    }, [filteredRows]);

    const anniversariesByDay = useMemo(() => buildAnniversaryByDay(calendarDays, anniversaries), [calendarDays, anniversaries]);

    const openForm = (mode: 'add' | 'edit' | 'delete', row?: any) => {
        setFormState({ open: true, mode, currentData: row || {} });
    };

    const closeForm = () => {
        setFormState((prev) => ({ ...prev, open: false }));
    };

    const handlePrevMonth = () => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const handleToday = () => {
        const today = new Date();
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    const handleOpenAdd = (baseDate?: Date) => {
        const date = baseDate ?? new Date();
        openForm('add', {
            id: -1,
            title: '',
            wdate: toInputDate(date),
            weather: '1',
            content: ''
        });
    };

    const monthLabel = `${viewYear}년 ${viewMonth}월`;

    return (
        <PageLayout>
            <PageHeader icon={Notebook} title="일기장(달력)" desc="다이어리 캘린더 기록 관리" iconClass="bg-blue-100 text-blue-600" />
            <div className="flex-1 flex flex-col gap-4">
                <div className="rounded-xl border border-zinc-200 bg-white p-3 sm:p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <Button type="button" variant="secondary" size="icon" onClick={handlePrevMonth}>
                            <ChevronLeft size={16} />
                        </Button>
                        <div className="min-w-[120px] text-center text-sm font-semibold text-zinc-800">{monthLabel}</div>
                        <Button type="button" variant="secondary" size="icon" onClick={handleNextMonth}>
                            <ChevronRight size={16} />
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleToday}>
                            오늘
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="일기 검색"
                            className="h-9 w-44 sm:w-56 rounded-lg border border-zinc-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <Button type="button" onClick={() => handleOpenAdd()}>
                            <Plus size={16} strokeWidth={2.5} />
                            <span>일기 추가</span>
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
                    <div className="grid grid-cols-7 border-b border-zinc-200 bg-zinc-50">
                        {WEEKDAY_LABELS.map((weekday) => (
                            <div key={weekday} className="py-2 text-center text-xs font-semibold text-zinc-500">
                                {weekday}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7">
                        {calendarDays.map((day) => {
                            const key = toDayKey(day);
                            const dayEntries = entriesByDay[key] || [];
                            const dayAnniversaries = anniversariesByDay[key] || [];
                            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                            const isToday = key === toDayKey(new Date());
                            const isSunday = day.getDay() === 0;
                            const isSaturday = day.getDay() === 6;
                            const firstAnniversary = dayAnniversaries[0];
                            const dateTextClass = isToday
                                ? 'bg-primary text-white'
                                : isSunday
                                  ? 'text-red-500'
                                  : isSaturday
                                    ? 'text-blue-500'
                                    : 'text-zinc-700';

                            return (
                                <div
                                    key={key}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => handleOpenAdd(day)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleOpenAdd(day);
                                        }
                                    }}
                                    className={`min-h-[108px] border-b border-r border-zinc-100 p-1.5 text-left align-top transition-colors ${
                                        isCurrentMonth ? 'bg-white hover:bg-zinc-50' : 'bg-zinc-50/60 text-zinc-400 hover:bg-zinc-100/60'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                        <div className="flex min-w-0 items-center gap-1">
                                            <span className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs ${dateTextClass}`}>
                                                {day.getDate()}
                                            </span>
                                            {firstAnniversary && (
                                                <span
                                                    className={`max-w-[84px] truncate rounded px-1 py-0.5 text-[10px] ${
                                                        firstAnniversary.holiday ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'
                                                    }`}
                                                    title={firstAnniversary.title}
                                                >
                                                    {firstAnniversary.title}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {dayAnniversaries.length > 1 && <span className="text-[10px] text-zinc-400">+{dayAnniversaries.length - 1}</span>}
                                            {dayEntries.length > 0 && <span className="text-[10px] text-zinc-400">{dayEntries.length}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        {dayEntries.slice(0, 3).map((entry: any) => {
                                            const weather = WEATHER_META[String(entry?.weather ?? '1')] || WEATHER_META['1'];
                                            return (
                                                <div
                                                    key={entry.id}
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openForm('edit', entry);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            openForm('edit', entry);
                                                        }
                                                    }}
                                                    className="truncate rounded px-1.5 py-0.5 text-[11px] bg-sky-50 text-sky-700"
                                                    title={`${weather.label} ${entry?.title ?? ''}`}
                                                >
                                                    {weather.emoji} {entry?.title ?? '(제목없음)'}
                                                </div>
                                            );
                                        })}
                                        {dayEntries.length > 3 && (
                                            <div className="text-[10px] text-zinc-400 pl-1">+{dayEntries.length - 3} more</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {!isLoading && filteredRows.length === 0 && (
                    <div className="text-center text-sm text-zinc-500 py-6">선택한 월에 등록된 일기가 없습니다.</div>
                )}
            </div>

            {formState.open && (
                <DiaryCalendarForm
                    modalFlag={formState.open}
                    modalToggle={closeForm}
                    mode={formState.mode}
                    dataFromParent={formState.currentData}
                    fieldKeys={formKeys}
                    idParam="diaryId"
                    entityLabel="다이어리"
                    callbackFromParent={() => {}}
                />
            )}
        </PageLayout>
    );
};

export default DiaryCalendar;
