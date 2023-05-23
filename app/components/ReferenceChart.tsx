"use client"

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Chart } from "../utils/wbgt"
import WBGTTag from "./WBGTTag"

export default function ReferenceChart({ chart }: { chart: Chart }) {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th rowSpan={2} colSpan={2}></Th>
            <Th
              colSpan={chart.temperatures.length + 1}
              textAlign="center"
            >
              Air Temperature
            </Th>
          </Tr>
          <Tr>
            {chart.temperatures.map((temp) => (
              <Th key={temp}>{temp}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th rowSpan={chart.humidities.length + 1}>
              <div
                style={{ writingMode: 'vertical-lr' }}
                className="transform rotate-180"
              >
                Relative Humidity
              </div>
            </Th>
          </Tr>
          {chart.humidities.map((rh, i) => (
            <Tr key={i}>
              <Td>{rh}</Td>
              {chart.table[i].map((item, j) => (
                <Td key={j}>
                  <WBGTTag label={item.value} colour={item.colour} />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
