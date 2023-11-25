import { useLocation, useRoutes } from 'react-router-dom'
import router from './router'
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'
import COLORS from 'src/theme/colors'
// import PretendardVariable from '@src/assets/fonts/PretendardVariable.ttf'

const App = () => {
  const content = useRoutes(router)
  const location = useLocation()

  const mainColor = location.pathname === '/' ? COLORS.primary : COLORS.antiPrimary
  const antiColor = location.pathname === '/' ? COLORS.antiPrimary : COLORS.primary

  const theme = responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: 'Pretendard-Regular'
      },
      palette: {
        primary: {
          main: COLORS.primary,
          contrastText: COLORS.antiPrimary
        },
        secondary: {
          main: COLORS.secondary,
          contrastText: COLORS.antiSecondary,
          light: COLORS.textHover
        },
        text: {
          primary: COLORS.text,
          secondary: COLORS.transparentText
        },
        background: {
          default: COLORS.primary,
          paper: COLORS.antibackground
        }
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
          @font-face {
            font-family: 'Pretendard-Regular';
            src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
            font-weight: 400;
            font-style: normal;
        }
          `
        },
        // MuiTabs: {
        //   styleOverrides: {
        //     indicator: {
        //       backgroundColor: mainColor
        //     },
        //     root: {
        //       color: mainColor
        //     }
        //   }
        // },
        // MuiTypography: {
        //   styleOverrides: {
        //     root: {
        //       color: mainColor
        //     }
        //   }
        // },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: antiColor,
              color: mainColor
            }
          }
        }
      }
    })
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  )
}

export default App
