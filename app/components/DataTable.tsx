"use client"

import { useState } from "react"
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Container, Center, Heading, Text } from "@chakra-ui/react"
import { Data } from "../api/types"
import { distance } from "../utils/location"
import WBGTTag from "./WBGTTag"

const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' })

const toRelativeMinutes = (date: string) => {
  let delta = Math.floor((Date.parse(date) - Date.now()) / (1000 * 60))
  return rtf.format(delta, 'minute')
}

const hideOnMobile = {
  className: "hidden sm:table-cell"
}

export default function DataTable({ data }: { data: Data[] }) {
  let [dataWithDistance, setDataWithDistance] = useState<Data[]>()

  if (typeof window !== 'undefined' && navigator.geolocation && !dataWithDistance) {
    navigator.geolocation.getCurrentPosition(position => {
      let newData = data.map(item => ({
        ...item,
        distance: Math.round(distance(position.coords, item.station.location)) / 1000
      }))
      newData.sort((a, b) => a.distance - b.distance)
      setDataWithDistance(newData)
    }, error => {
      console.error(error)
    }, {
      enableHighAccuracy: false,
      maximumAge: 1000 * 60 * 60
    })
  }

  let updateTime = data
    .flatMap(item => [item.temperature.timestamp, item.humidity.timestamp])
    .reduce((acc, curr) => acc < curr ? acc : curr)

  return (
    <Center flexDirection="column" gap={5} mt={5}>
      <Heading my={3}>Wet Bulb Globe Temperature</Heading>
      <TableContainer>
        <Table size="sm" variant='simple'>
          <TableCaption>Air temperature, relative humidity, and wet bulb globe temperature (WBGT)</TableCaption>
          <Thead>
            <Tr>
              <Th>Location</Th>
              { dataWithDistance && <Th {...hideOnMobile} isNumeric>Distance (km)</Th> }
              <Th>WBGT</Th>
              <Th isNumeric>Temp (°C)</Th>
              <Th isNumeric>RH (%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(dataWithDistance ?? data).map(item => (
                <Tr key={item.station_id}>
                  <Td>{item.station?.name}</Td>
                  { item.distance && <Td {...hideOnMobile} isNumeric>{item.distance}</Td> }
                  <Td><WBGTTag label={item.wbgt.value} colour={item.wbgt.colour} /></Td>
                  <Td isNumeric>{item.temperature.value}</Td>
                  <Td isNumeric>{item.humidity.value}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Text>Updated {toRelativeMinutes(updateTime)}</Text>
    </Center>
  )
}