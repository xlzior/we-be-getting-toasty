import { useState, useEffect } from "react"

const geolocationOptions = {
  enableHighAccuracy: false,
  maximumAge: 1000 * 60 * 60
}

export const useGeolocation = () => {
  let [geolocation, setGeolocation] = useState<GeolocationPosition>()

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setGeolocation,
        error => {},
        geolocationOptions)
    }
  }, [])

  return geolocation
}
