import DataTable from "./components/DataTable";
import ReferenceAccordion from "./components/ReferenceAccordion";
import { getData } from "./api";
import { getChart } from "./api/wbgt";

export default async function Home() {
  const data = await getData()

  return (
    <>
      <DataTable data={data} />
      <ReferenceAccordion chart={getChart()}/>
    </>
  )
}
