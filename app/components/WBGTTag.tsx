"use client"

import { Tag, TagLabel } from "@chakra-ui/react"

type Props = {
  label: number,
  colour: string
}

export default function WBGTTag({ label, colour }: Props) {
  return (
    <Tag colorScheme={colour}>
      <TagLabel>{label}</TagLabel>
    </Tag>
  )
}