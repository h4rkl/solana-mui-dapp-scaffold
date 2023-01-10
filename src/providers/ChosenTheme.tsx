import React, { createContext, Dispatch, SetStateAction } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useLocalStorage } from '@caldwell619/react-hooks'

type ThemeName = 'dark' | 'light'

interface IChosenTheme {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
}

interface Props {
  children: React.ReactNode
}

export const ChosenTheme = createContext<IChosenTheme>({} as IChosenTheme)

export const ChosenThemeProvider: React.FC<Props>  = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useLocalStorage<ThemeName>('theme', prefersDarkMode ? 'dark' : 'light', true)

  return <ChosenTheme.Provider value={{ theme, setTheme }}>{children}</ChosenTheme.Provider>
}
