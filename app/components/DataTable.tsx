"use client"

import { Tr, Td } from "@chakra-ui/react"
import { Data } from "../api/types"
import { useGeolocation } from "../utils/geolocation"
import { distance } from "../utils/location"
import DataTableTemplate from "./DataTableTemplate"
import WBGTTag from "./WBGTTag"

const hideOnMobile = {
  className: "hidden sm:table-cell"
}

export default function DataTable({ data }: { data: Data[] }) {
  const geolocation = useGeolocation();

  let displayData = data;

  if (geolocation?.coords) {
    let dataWithDistance = data.map(item => ({
      ...item,
      distance: Math.round(distance(geolocation.coords, item.station.location)) / 1000
    }))
    dataWithDistance.sort((a, b) => a.distance - b.distance)
    displayData = dataWithDistance
  }

  let updateTime = data
    .flatMap(item => [item.temperature.timestamp, item.humidity.timestamp])
    .reduce((acc, curr) => acc < curr ? acc : curr)

  return (
    <DataTableTemplate
      updateTime={updateTime}
      showDistanceColumn={geolocation !== undefined}
    >
      {displayData.map(item => (
          <Tr key={item.station_id}>
            <Td>{item.station?.name}</Td>
            { item.distance && <Td {...hideOnMobile} isNumeric>{item.distance}</Td> }
            <Td><WBGTTag label={item.wbgt.value} colour={item.wbgt.colour} /></Td>
            <Td isNumeric>{item.temperature.value}</Td>
            <Td isNumeric>{item.humidity.value}</Td>
          </Tr>
        ))}
    </DataTableTemplate>
  )
}