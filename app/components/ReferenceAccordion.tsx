"use client"

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import NextLink from 'next/link'
import { Chart, getChart } from "../utils/wbgt"
import WBGTTag from "./WBGTTag"

function ReferenceChart({ chart }: { chart: Chart }) {
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
            <Th
              rowSpan={chart.humidities.length + 1}
              style={{ writingMode: 'vertical-rl' }}
              textAlign="center"
              className="transform rotate-180"
            >
              Relative Humidity
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

export default function ReferenceAccordion() {
  const chart = getChart()

  return (
    <Center flexDirection="column" my={5}>
      <Accordion allowToggle w="100%" maxW="1280px">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                WBGT Estimation Chart
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <ReferenceChart chart={chart} />
            <Link as={NextLink} href='https://www.wbgt.sg/' target="_blank">
              Source
            </Link>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Center>
  )
}