import { WBGT, getWBGT } from "./wbgt"

type Station = {
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

type Response = {
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

type LatestData = {
  [key: string]: LatestReading
}

type DataType = "air-temperature" | "relative-humidity"

function getURL(dataType: DataType, date: string) {
  return `https://api.data.gov.sg/v1/environment/${dataType}?date=${date}`
}

async function getLatestData(dataType: DataType, date: string): Promise<LatestData> {
  let response: Response = await fetch(
    getURL(dataType, date),
    { next: { revalidate: 600 } })
  .then(res => res.json())

  const latestData: LatestData = {}

  response.items
  .flatMap(dataItem => dataItem.readings.map(item => ({
      timestamp: dataItem.timestamp,
      ...item
    }))
  )
  .forEach(reading => {
    latestData[reading.station_id] = {
      ...reading,
      station: response.metadata.stations.find(item => item.id === reading.station_id)!
    }
  })

  return latestData
}

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

function combineData(temperature: LatestData, humidity: LatestData): Data[] {
  if (temperature === undefined || humidity === undefined) return [];

  let stations = Object.keys(temperature)

  let data: Data[] = stations.map(stationId => ({
    station_id: stationId,
    station: temperature[stationId].station,
    temperature: {
      timestamp: temperature[stationId].timestamp,
      value: temperature[stationId].value
    },
    humidity: {
      timestamp: humidity[stationId].timestamp,
      value: humidity[stationId].value
    },
    wbgt: getWBGT(temperature[stationId].value, humidity[stationId].value)
  }))

  return data
}

export async function getData(): Promise<Data[]> {
  let date = (new Date()).toISOString().substring(0, 10)

  let temperature = getLatestData("air-temperature", date)
  let humidity = getLatestData("relative-humidity", date)

  return combineData(await temperature, await humidity)
}
