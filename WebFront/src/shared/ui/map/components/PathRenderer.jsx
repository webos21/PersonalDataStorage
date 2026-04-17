import { useMemo, useEffect, useRef, useState, useCallback } from 'react'
import { Polyline, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-polylinedecorator'
import { FitBoundsToPath } from './FitBoundsToPath'

/* ── 출발 마커 (초록 핀) ── */
const startIcon = L.icon({
    iconUrl: '/assets/map/depart.png',
    iconSize: [33, 45],
    iconAnchor: [16, 46],
    popupAnchor: [0, -46],
})

/* ── 도착 마커 (빨간 핀) ── */
const endIcon = L.icon({
    iconUrl: '/assets/map/arrival.png',
    iconSize: [33, 45],
    iconAnchor: [16, 46],
    popupAnchor: [0, -46],
})

/* ── 클릭 위치 마커 (투명 - 팝업 앵커 용도) ── */
const transparentIcon = L.divIcon({
    className: '',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
})

/**
 * ArrowDecorator - 경로 위에 방향 화살표를 일정 간격으로 표시
 */
function ArrowDecorator({ positions, color = '#020088ff' }) {
    const map = useMap()
    const decoratorRef = useRef(null)

    useEffect(() => {
        if (!positions || positions.length < 2) return

        // 화살표 뒤 원형 배경 심볼 (화살표 무게중심에 맞춰 offset)
        const CircleSymbol = L.Class.extend({
            buildSymbol(dirPoint, latLngs, mapInst) {
                const d2r = Math.PI / 180
                const tipPx = mapInst.project(dirPoint.latLng)
                const dir = (-(dirPoint.heading - 90)) * d2r
                const offset = 6 // 화살표 tip → 무게중심 보정 (px)
                const centerPx = L.point(
                    tipPx.x - offset * Math.cos(dir),
                    tipPx.y + offset * Math.sin(dir),
                )
                const center = mapInst.unproject(centerPx)
                return L.circleMarker(center, {
                    radius: 12,
                    color: color,
                    weight: 2,
                    fill: false,
                    interactive: false,
                })
            }
        })

        const polyline = L.polyline(positions)
        const decorator = L.polylineDecorator(polyline, {
            patterns: [
                // 1) 원형 배경 (아래 레이어)
                {
                    offset: '5%',
                    repeat: '80px',
                    symbol: new CircleSymbol(),
                },
                // 2) 방향 화살표 (위 레이어 - 기존 그대로)
                {
                    offset: '5%',
                    repeat: '80px',
                    symbol: L.Symbol.arrowHead({
                        pixelSize: 14,
                        polygon: true,
                        pathOptions: {
                            stroke: true,
                            color: '#fff',
                            weight: 2,
                            fillColor: color,
                            fillOpacity: 1,
                            opacity: 1,
                        },
                    }),
                },
            ],
        }).addTo(map)

        decoratorRef.current = decorator

        return () => {
            if (decoratorRef.current) {
                map.removeLayer(decoratorRef.current)
            }
        }
    }, [map, positions, color])

    return null
}

/**
 * 클릭 위치에서 가장 가까운 trackData 포인트의 인덱스를 반환
 */
function findNearestIndex(latlng, positions) {
    let minDist = Infinity
    let nearestIdx = 0
    for (let i = 0; i < positions.length; i++) {
        const dlat = latlng.lat - positions[i][0]
        const dlng = latlng.lng - positions[i][1]
        const dist = dlat * dlat + dlng * dlng
        if (dist < minDist) {
            minDist = dist
            nearestIdx = i
        }
    }
    return nearestIdx
}

/**
 * timestamp 문자열을 날짜 시:분:초로 포맷
 * - "260320174125" (YYMMDDHHMMSS) → "2026-03-20 17:41:25"
 * - "2026-03-25 14:30:05" → "2026-03-25 14:30:05"
 * - "2026-03-25T14:30:05" → "2026-03-25 14:30:05"
 */
function formatTime(ts) {
    if (!ts) return '--:--:--'
    const s = String(ts)
    // YYMMDDHHMMSS (12자리 숫자)
    if (/^\d{12}$/.test(s)) {
        const yy = s.substring(0, 2)
        const MM = s.substring(2, 4)
        const dd = s.substring(4, 6)
        const hh = s.substring(6, 8)
        const mm = s.substring(8, 10)
        const ss = s.substring(10, 12)
        return `20${yy}-${MM}-${dd} ${hh}:${mm}:${ss}`
    }
    // ISO 또는 공백 구분
    if (s.includes('T')) return s.replace('T', ' ').substring(0, 19)
    return s.substring(0, 19)
}

/**
 * PathRenderer - 경로 Polyline + 방향 화살표 + 자동 줌 + 시작/끝 마커 (공통 컴포넌트)
 * 
 * @param {Array<[number, number]>} positions - [[lat, lng], ...] 형태의 좌표 배열
 * @param {Array<Object>} trackData - [{ timestamp, speed, ... }, ...] 원본 트랙 포인트 배열 (선택)
 * @param {string} color - 경로 색상 (기본: #3b82f6)
 * @param {number} weight - 선 두께 (기본: 4)
 * @param {number} opacity - 불투명도 (기본: 0.8)
 * @param {boolean} showMarkers - (deprecated) 시작/끝 마커 표시 여부 (기본: false). showStartMarker/showEndMarker 사용 권장
 * @param {boolean} showStartMarker - 시작 마커 표시 여부 (기본: showMarkers)
 * @param {boolean} showEndMarker - 도착 마커 표시 여부 (기본: showMarkers)
 * @param {boolean} showArrows - 방향 화살표 표시 여부 (기본: true)
 * @param {boolean} autoFit - 자동 줌 여부 (기본: true)
 * @param {number} padding - fitBounds 패딩 (기본: 50)
 */
export function PathRenderer({
    positions,
    trackData,
    color = '#3b82f6',
    weight = 4,
    opacity = 0.8,
    showMarkers = false,
    showStartMarker,
    showEndMarker,
    showArrows = true,
    autoFit = true,
    padding = 50
}) {
    const [clickedInfo, setClickedInfo] = useState(null) // { latlng, timestamp, speed }
    const markerRef = useRef(null)

    // 유효한 좌표만 필터링
    const validPositions = useMemo(() => {
        if (!positions || positions.length === 0) return []
        return positions.filter(p =>
            Array.isArray(p) &&
            p[0] != null &&
            p[1] != null
        )
    }, [positions])

    // Polyline 클릭 핸들러
    const handlePolylineClick = useCallback((e) => {
        if (!trackData || trackData.length === 0) return
        const idx = findNearestIndex(e.latlng, validPositions)
        const point = trackData[idx]
        if (!point) return
        setClickedInfo({
            latlng: [validPositions[idx][0], validPositions[idx][1]],
            timestamp: point.timestamp,
            speed: point.speed,
        })
    }, [trackData, validPositions])

    // 팝업 자동 열기
    useEffect(() => {
        if (clickedInfo && markerRef.current) {
            markerRef.current.openPopup()
        }
    }, [clickedInfo])

    // 최소 2개 이상의 점이 필요
    if (validPositions.length < 2) return null

    const startPoint = validPositions[0]
    const endPoint = validPositions[validPositions.length - 1]

    // Backward compatibility: if showStartMarker/showEndMarker not provided, fall back to showMarkers.
    const shouldShowStartMarker = showStartMarker ?? showMarkers
    const shouldShowEndMarker = showEndMarker ?? showMarkers

    return (
        <>
            {/* Auto Fit to Bounds */}
            {autoFit && <FitBoundsToPath positions={validPositions} padding={padding} />}

            {/* Polyline */}
            <Polyline
                positions={validPositions}
                pathOptions={{
                    color,
                    weight: trackData ? Math.max(weight, 6) : weight,
                    opacity,
                    lineCap: 'round',
                    lineJoin: 'round',
                }}
                eventHandlers={trackData ? { click: handlePolylineClick } : undefined}
            />

            {/* 클릭 시 시간 팝업 */}
            {clickedInfo && (
                <Marker
                    position={clickedInfo.latlng}
                    icon={transparentIcon}
                    ref={markerRef}
                >
                    <Popup>
                        <div style={{ textAlign: 'center', fontSize: '13px', lineHeight: '1.6' }}>
                            <div style={{ fontWeight: 600 }}>
                                {formatTime(clickedInfo.timestamp)}
                            </div>
                            {clickedInfo.speed != null && (
                                <div style={{ color: '#666' }}>
                                    {clickedInfo.speed} km/h
                                </div>
                            )}
                        </div>
                    </Popup>
                </Marker>
            )}

            {/* Direction Arrows */}
            {showArrows && <ArrowDecorator positions={validPositions} />}

            {/* Start/End Markers (Optional) */}
            {shouldShowStartMarker && (
                <Marker position={startPoint} icon={startIcon}>
                    <Popup>출발 지점</Popup>
                </Marker>
            )}
            {shouldShowEndMarker && (
                <Marker position={endPoint} icon={endIcon}>
                    <Popup>도착 지점</Popup>
                </Marker>
            )}
        </>
    )
}
