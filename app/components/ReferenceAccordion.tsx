"use client"

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, Link } from "@chakra-ui/react"
import NextLink from 'next/link'
import { getChart } from "../utils/wbgt"
import ReferenceChart from "./ReferenceChart"

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