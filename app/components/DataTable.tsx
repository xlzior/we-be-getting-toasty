"use client"

import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Container, Center, Heading, Text } from "@chakra-ui/react"
import { Data } from "../api"
import WBGTTag from "./WBGTTag"
import { useState } from "react"

const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' })

const toRelativeMinutes = (date: string) => {
  let delta = Math.floor((Date.parse(date) - Date.now()) / (1000 * 60))
  return rtf.format(delta, 'minute')
}

type Coordinates = {
  latitude: number,
  longitude: number
}

const distance = (coords1: Coordinates, coords2: Coordinates) => {
  let { latitude: lat1, longitude: lon1 } = coords1;
  let { latitude: lat2, longitude: lon2 } = coords2;

  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres

  return d
}

const hideOnMobile = {
  className: "hidden sm:table-cell"
}

const showOnMobile = {
  className: "sm:hidden"
}

export default function DataTable({ data }: { data: Data[] }) {
  let [dataWithDistance, setDataWithDistance] = useState<Data[]>()

  if (typeof window !== 'undefined' && navigator.geolocation && !dataWithDistance) {
    navigator.geolocation.getCurrentPosition(position => {
      let newData = data.map(item => ({
        ...item,
        distance: Math.floor(distance(position.coords, item.station.location)) / 1000
      }))
      newData.sort((a, b) => a.distance - b.distance)
      setDataWithDistance(newData)
    })
  }

  let updateTime = data
    .flatMap(item => [item.temperature.timestamp, item.humidity.timestamp])
    .reduce((acc, curr) => acc < curr ? acc : curr)

  return (
    <Center flexDirection="column">
      <Heading>Wet Bulb Globe Temperature</Heading>
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