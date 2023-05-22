"use client"

import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Center, Heading, Text, Spinner, Td } from "@chakra-ui/react"
import { toRelativeMinutes } from "../utils/date"

const hideOnMobile = {
  className: "hidden sm:table-cell"
}

type DataTableTemplateProps = {
  updateTime?: string,
  showDistanceColumn?: boolean,
  children?: React.ReactNode
}

function LoadingState() {
  return (
    <Tr>
      <Td colSpan={5} textAlign="center">
        <Spinner size="xl" my={5} />
      </Td>
    </Tr>
  )
}

export default function DataTableTemplate(props: DataTableTemplateProps) {
  const { updateTime, showDistanceColumn = false, children } = props;

  return (
    <Center flexDirection="column" gap={5} mt={5}>
      <Heading my={3}>Wet Bulb Globe Temperature</Heading>
      <TableContainer>
        <Table size="sm" variant='simple'>
          <TableCaption>Air temperature, relative humidity, and wet bulb globe temperature (WBGT)</TableCaption>
          <Thead>
            <Tr>
              <Th>Location</Th>
              { showDistanceColumn && <Th {...hideOnMobile} isNumeric>Distance (km)</Th> }
              <Th px={1}>WBGT (°C)</Th>
              <Th px={1} isNumeric>Temp (°C)</Th>
              <Th px={1} isNumeric>RH (%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {children ?? <LoadingState />}
          </Tbody>
        </Table>
      </TableContainer>
      { updateTime ? (<Text>Updated {toRelativeMinutes(updateTime)}</Text>) : null}
    </Center>
  )
}