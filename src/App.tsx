import { useRoutes } from 'react-router-dom'
import router from './router'
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'
import COLORS from 'src/theme/colors'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from 'react-auth-kit'

const App = () => {
  const content = useRoutes(router)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  })
  const theme = responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: 'Pretendard-Regular'
      },
      palette: {
        primary: {
          main: '#D4E5EF',
          light: '#ECF2FF',
          dark: '#4570EA'
        },
        secondary: {
          main: '#49BEFF',
          light: '#E8F7FF',
          dark: '#23afdb'
        },
        success: {
          main: '#13DEB9',
          light: '#E6FFFA',
          dark: '#02b3a9',
          contrastText: '#ffffff'
        },
        info: {
          main: '#539BFF',
          light: '#EBF3FE',
          dark: '#1682d4',
          contrastText: '#ffffff'
        },
        error: {
          main: '#FA896B',
          light: '#FDEDE8',
          dark: '#f3704d',
          contrastText: '#ffffff'
        },
        warning: {
          main: '#FFAE1F',
          light: '#FEF5E5',
          dark: '#ae8e59',
          contrastText: '#ffffff'
        },
        grey: {
          100: '#F2F6FA',
          200: '#EAEFF4',
          300: '#DFE5EF',
          400: '#7C8FAC',
          500: '#5A6A85',
          600: '#2A3547'
        },
        text: {
          primary: '#2A3547',
          secondary: '#5A6A85'
        },
        action: {
          disabledBackground: 'rgba(73,82,88,0.12)',
          hoverOpacity: 0.02,
          hover: '#f6f9fc'
        },
        divider: '#e5eaef'
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
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: COLORS.text
            }
          }
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': '#E0E3E7',
              '--TextField-brandBorderHoverColor': '#B2BAC2',
              '--TextField-brandBorderFocusedColor': '#6F7E8C',
              '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)'
              }
              // '& .MuiOutlinedInput-notchedOutline': {
              //   borderColor: COLORS.primary // Change 'blue' to the desired color
              // },
              // '&:hover .MuiOutlinedInput-notchedOutline': {
              //   borderColor: COLORS.textHover // Change 'green' to the desired hover color: ;
              // }
            }
          }
        }
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
      }
    })
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
          <AuthProvider authType="localstorage" authName={'_auth'}>
            <CssBaseline />
            {content}
          </AuthProvider>
        </SnackbarProvider>
        {/* </LocalizationProvider> */}
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
