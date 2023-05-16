import { getDateTime, oneMinuteBefore } from "../utils/date"
import { getWBGT } from "../utils/wbgt"
import { ApiResponse, Data, DataType, LatestData } from "./types"

const REVALIDATION_TIME = 60 * 10 // 10 minutes

function getURL(dataType: DataType, datetime: string) {
  return `https://api.data.gov.sg/v1/environment/${dataType}?date_time=${datetime}`
}

async function getLatestData(dataType: DataType, datetime: string): Promise<LatestData> {
  let response: ApiResponse = await fetch(
    getURL(dataType, datetime),
    { next: { revalidate: 0 } })
  .then(res => res.json())
  .catch(error => console.error(error))

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
  let datetime = getDateTime()
  let results: { [key: string]: Data } = {}

  let prevNumStations = -1
  let numStations = 0

  while (prevNumStations != numStations) {
    const temperature = getLatestData("air-temperature", datetime)
    const humidity = getLatestData("relative-humidity", datetime)
    const newData = combineData(await temperature, await humidity)

    newData.forEach(item => {
      if (!results[item.station_id]) {
        results[item.station_id] = item
      }
    })

    prevNumStations = numStations
    numStations = Object.keys(results).length
    datetime = oneMinuteBefore(newData[0].temperature.timestamp)
  }

  return Object.values(results)
}
