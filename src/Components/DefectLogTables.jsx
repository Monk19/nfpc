import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "s.No", width: 70 },
  {
    field: "totalbootles",
    headerName: "Number of bottles",
    type: "number",
    width: 130,
  },
  { field: "Scratch", headerName: "Scratch", type: "number", width: 130 },
  {
    field: "discoloration",
    headerName: "Discoloration",
    type: "number",
    width: 130,
  },
  {
    field: "foreignparticles",
    headerName: "Foreign Particles",
    type: "number",
    width: 130,
  },
];

const rows = [
  {
    id: 1,
    totalbootles: 100,
    Scratch: 30,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 2,
    totalbootles: 100,
    Scratch: 30,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 3,
    totalbootles: 100,
    Scratch: 120,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 4,
    totalbootles: 100,
    Scratch: 30,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 5,
    totalbootles: 100,
    Scratch: 120,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 6,
    totalbootles: 100,
    Scratch: 30,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 7,
    totalbootles: 100,
    Scratch: 120,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 8,
    totalbootles: 100,
    Scratch: 30,
    discoloration: 35,
    foreignparticles: 80,
  },
];

export default function DefectLogTables() {
  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
