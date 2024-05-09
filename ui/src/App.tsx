import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'

//routing
import Routes from "@ems/routes";

import theme from './theme'

function App() {

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
