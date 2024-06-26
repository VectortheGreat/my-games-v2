import { createTheme } from "@mui/material/styles"

import { PRIMARY } from "./colors"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: "#E8E8E8"
    },
    text: {
      primary: "#fff"
    }
  },
  spacing: 8,
  shape: {
    borderRadius: 4
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "bold",
      boxShadow: "none",
      borderRadius: 1.6
    },
    fontFamily: "Poppins, sans-serif"
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#6b7280"
            },
            "&:hover fieldset": {
              borderColor: "#6b7280"
            },
            "&.Mui-focused fieldset": {
              borderColor: PRIMARY
            },
            color: "#000"
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000",
          "&.Mui-focused": {
            color: PRIMARY
          }
        }
      }
    }
  }
})

export default theme
