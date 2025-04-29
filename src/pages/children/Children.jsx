import React, { useState } from "react";
import TableSearchChildren from "../../components/tableSearchChildren/TableSearchChildren";
import SearchChild from "../../components/searchChild/SearchChild";

export default function Children() {
  const [childResultData, setChildResultData] = useState(null);
  return (
    <>
      <SearchChild onResult={setChildResultData} />
      <TableSearchChildren data={childResultData} />
    </>
  );
}
