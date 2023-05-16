import { WBGT } from "../utils/wbgt"

export type Station = {
  id: string,
  device_id: string,
  name: string,
  location: {
    latitude: number,
    longitude: number
  }
}

type Reading = {
  station_id: string,
  value: number
}

type DataItem = {
  timestamp: string,
  readings: Reading[]
}

export type ApiResponse = {
  metadata: {
    stations: Station[]
  },
  items: DataItem[]
}

type LatestReading = {
  timestamp: string,
  station_id: string,
  station: Station,
  value: number
}

export type LatestData = {
  [key: string]: LatestReading
}

export type DataType = "air-temperature" | "relative-humidity"

export type Data = {
  station_id: string,
  station: Station,
  temperature: {
    timestamp: string,
    value: number
  },
  humidity: {
    timestamp: string,
    value: number
  },
  wbgt: WBGT,
  distance?: number
}
