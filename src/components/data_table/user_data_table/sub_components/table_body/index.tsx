import { Avatar, TableBody, TableRow, Typography } from "@mui/material"
import TableCell from "@mui/material/TableCell"
import { useMemo } from "react"

import Link from "@components/link"
import {
  TABLE_ROW_BACKGROUND_COLOR,
  TABLE_ROW_BACKGROUND_COLOR_HOVER
} from "@constants/colors"
import { TABLE_TEXT_SIZE } from "@constants/sizes"
import { useUsersPageContext } from "context/users"

export function UserDataTableBody() {
  const { columns, rows } = useUsersPageContext()

  const MemorizedRows = useMemo(() => {
    return rows?.map((row, index) => {
      return (
        <TableRow
          sx={{
            backgroundColor: TABLE_ROW_BACKGROUND_COLOR,
            ":hover": { backgroundColor: TABLE_ROW_BACKGROUND_COLOR_HOVER }
          }}
          key={index}
          hover
          role="checkbox"
          tabIndex={-1}
        >
          {columns.map((column) => {
            const value = row[column.id as keyof typeof row]
            return (
              <TableCell
                sx={{
                  color: "white",
                  p: "1rem 2rem",
                  borderBottom: "1px solid #666666"
                }}
                key={column.id}
                align={column.align}
              >
                {column.id === "profileImage" ? (
                  <Avatar
                    src={String(value)}
                    alt={String(value)}
                    sx={{ width: "60px", height: "60px" }}
                  />
                ) : column.id === "name" ? (
                  <Link
                    sx={{
                      ":hover": { color: "#075985" },
                      cursor: "pointer",
                      fontSize: TABLE_TEXT_SIZE,
                      display: "inline-block"
                    }}
                    href={`/games/${row._id}`}
                  >
                    {typeof value === "string" && value.length > 40
                      ? value.substring(0, 40) + "..."
                      : value}
                  </Link>
                ) : (
                  <Typography>
                    {column.id === "actions" ? null : value || 0}
                  </Typography>
                )}
              </TableCell>
            )
          })}
        </TableRow>
      )
    })
  }, [rows, columns])
  return <TableBody>{MemorizedRows}</TableBody>
}
