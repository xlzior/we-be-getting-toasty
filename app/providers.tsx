// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    black: {
      50: '#f2f2f2',
     100: '#d9d9d9',
     200: '#bfbfbf',
     300: '#a6a6a6',
     400: '#8c8c8c',
     500: '#737373',
     600: '#595959',
     700: '#404040',
     800: '#262626',
     900: '#0d0d0d',
    }
  }
})

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}