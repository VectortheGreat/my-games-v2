import CreateIcon from "@mui/icons-material/Create"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useMemo } from "react"

import AddScreenShot from "@components/dialogs/add_screenshots"
import DeleteGame from "@components/dialogs/delete_game"
import DeleteScreenshot from "@components/dialogs/delete_screenshots"
import EditGame from "@components/dialogs/edit_game"
import EditScreenShot from "@components/dialogs/edit_screenshots"
import Loading from "@components/loading"
import PreviewScreenShot from "@components/preview_screenshot"
import GameDetailRow from "@pages/main/game_detail/sub_components/game_detail_row"
import Screenshots from "@pages/main/game_detail/sub_components/screenshots"
import { useGameDetailPageContext } from "context/games_detail"
import { GamesData } from "types/games"

export default function GameDetailPage() {
  const {
    game,
    isEditGameDialogOpen,
    isDeleteGameDialogOpen,
    setIsEditGameDialogOpen,
    setIsDeleteGameDialogOpen
  } = useGameDetailPageContext()
  if (!game) return <Loading />
  return (
    <Stack gap={1.5} px={10} py={5}>
      <GameDetailTitle game={game} />
      <Screenshots />
      <EditGame
        isEditGameDialogOpen={isEditGameDialogOpen}
        setIsEditGameDialogOpen={setIsEditGameDialogOpen}
      />
      <DeleteGame
        isDeleteGameDialogOpen={isDeleteGameDialogOpen}
        setIsDeleteGameDialogOpen={setIsDeleteGameDialogOpen}
      />
      <AddScreenShot />
      <EditScreenShot />
      <DeleteScreenshot />
      <PreviewScreenShot />
    </Stack>
  )
}

function GameDetailTitle({ game }: { game: GamesData }) {
  const {
    setIsEditGameDialogOpen,
    setIsDeleteGameDialogOpen,
    setIsAddScreenshotDialogOpen,
    token
  } = useGameDetailPageContext()
  const isOwner = useMemo(
    () => game.userId === token?.data.id,
    [game.userId, token?.data.id]
  )
  return (
    <Stack direction={"row"} gap={3}>
      <Box
        component={"img"}
        src={game?.photo}
        sx={{
          width: "20rem",
          height: "24rem",
          objectFit: "cover",
          borderRadius: 2
        }}
      />
      <Stack direction={"column"} gap={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={2}
        >
          <Typography variant="h3">{game?.name}</Typography>
          <Stack
            display={token && isOwner ? "flex" : "none"}
            direction={"row"}
            gap={1}
          >
            <Button onClick={setIsAddScreenshotDialogOpen} variant="contained">
              <PhotoSizeSelectActualIcon />
            </Button>
            <Button onClick={setIsEditGameDialogOpen} variant="contained">
              <CreateIcon />
            </Button>
            <Button
              onClick={setIsDeleteGameDialogOpen}
              color="error"
              variant="contained"
            >
              <DeleteForeverIcon />
            </Button>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <GameDetailRow title="platform" content={game.platform} />
          <GameDetailRow title="rating" content={game.rating} />
          <GameDetailRow title="status" content={game.status} />
          <GameDetailRow title="playTime" content={game.playTime} />
          <GameDetailRow title="lastPlay" content={game.lastPlay} />
          <GameDetailRow title="review" content={game.review} />
        </Stack>
      </Stack>
    </Stack>
  )
}
