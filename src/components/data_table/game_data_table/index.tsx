import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Box, IconButton, Popover, Stack, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import { ChangeEvent, useCallback } from "react"

import { GameDataTableBody } from "@components/data_table/game_data_table/sub_components/table_body"
import { GameDataTableTitle } from "@components/data_table/game_data_table/sub_components/table_titles"
import SearchBar from "@components/search_bar"
import {
  TABLE_HEADER_BACKGROUND_COLOR,
  TABLE_HEADER_COLOR,
  TABLE_ROW_BACKGROUND_COLOR
} from "@constants/colors"
import { useGamesPageContext } from "context/games"

export default function GameDataTable() {
  const {
    translate,
    setIsEditGameDialogOpen,
    setIsDeleteGameDialogOpen,
    setAnchorEl,
    anchorEl,
    rows,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage
  } = useGamesPageContext()

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage?.(newPage)
  }
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage?.(+event.target.value)
    setPage?.(0)
  }

  function handleClose() {
    setAnchorEl?.(null)
  }

  const handleEditGame = useCallback(() => {
    setAnchorEl?.(null)
    setIsEditGameDialogOpen?.()
  }, [setIsEditGameDialogOpen])

  const handleDeleteGame = useCallback(() => {
    setAnchorEl?.(null)
    setIsDeleteGameDialogOpen?.()
  }, [setIsDeleteGameDialogOpen])

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden"
      }}
    >
      <TableHeader />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <GameDataTableTitle />
          <GameDataTableBody />
        </Table>
      </TableContainer>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        sx={{
          "& > *": {
            borderRadius: 2.3,
            boxShadow: "0px 3px 6px #00000029"
          }
        }}
      >
        <Box
          sx={{
            padding: 1,
            pr: 9,
            cursor: "pointer",
            color: "#fff",
            "&:hover": {
              background: "#F1F1F1",
              color: "#000"
            }
          }}
          onClick={handleEditGame}
        >
          {translate("edit")}
        </Box>
        <Box
          sx={{
            padding: 1,
            pr: 9,
            cursor: "pointer",
            color: "red",
            "&:hover": {
              background: "#F1F1F1"
            }
          }}
          onClick={handleDeleteGame}
        >
          {translate("delete")}
        </Box>
      </Popover>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          ".MuiTablePagination-toolbar": {
            color: "#fff",
            bgcolor: TABLE_HEADER_BACKGROUND_COLOR
          },
          ".MuiList-root-MuiMenu-list": {
            color: "#fff"
          }
        }}
        SelectProps={{
          MenuProps: {
            sx: {
              ".MuiPaper-root": {
                color: "#fff"
              }
            }
          }
        }}
      />
    </Paper>
  )
}

function TableHeader() {
  const { translate, setIsAddGameDialogOpen, reset } = useGamesPageContext()
  function handleAddGame() {
    reset?.({
      name: ""
    })
    setIsAddGameDialogOpen?.()
  }
  return (
    <Stack
      spacing={2}
      justifyContent="space-between"
      sx={{
        backgroundColor: TABLE_ROW_BACKGROUND_COLOR,
        p: 2,
        width: "100%",
        flexDirection: {
          xs: "column",
          sm: "row"
        }
      }}
    >
      <Stack
        justifyContent={"space-around"}
        sx={{
          alignItems: {
            xs: "center",
            sm: "flex-start"
          }
        }}
      >
        <Typography fontSize={24} fontWeight="bold" color={"white"}>
          {translate("games")}
        </Typography>
        <Typography color={TABLE_HEADER_COLOR} variant="body2">
          {translate("all_played_games_by_user", {
            user: "Vector"
          })}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={1}
        sx={{
          justifyContent: {
            xs: "center",
            sm: "flex-end"
          }
        }}
      >
        <IconButton onClick={handleAddGame}>
          <AddCircleOutlineIcon
            sx={{ width: "40px", height: "40px", color: "white" }}
          />
        </IconButton>
        <SearchBar translate={translate} />
      </Stack>
    </Stack>
  )
}
