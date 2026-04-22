import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

/**
 * FitBoundsToPath
 * - 주어진 positions(좌표 배열)에 맞게 지도 뷰를 자동 조절합니다.
 * - react-leaflet MapContainer 안에서만 사용 가능합니다.
 * 
 * @param {Array<[number, number]>} positions - [[lat, lng], ...] 형태의 좌표 배열
 * @param {number} padding - fitBounds 시 패딩 (기본 50px)
 */
export function FitBoundsToPath({ positions, padding = 50 }) {
    const map = useMap()

    useEffect(() => {
        if (positions && positions.length > 1) {
            const bounds = L.latLngBounds(positions)
            map.fitBounds(bounds, { padding: [padding, padding] })
        }
    }, [positions, padding, map])

    return null
}
