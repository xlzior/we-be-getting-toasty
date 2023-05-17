import { headers } from "next/headers"

import DataTable from "./components/DataTable";
import ReferenceAccordion from "./components/ReferenceAccordion";
import { getData } from "./api";

export default async function Home() {
  // force dynamic rendering, not static rendering
  headers()

  const data = await getData()

  return (
    <>
      <DataTable data={data} />
      <ReferenceAccordion />
    </>
  )
}
