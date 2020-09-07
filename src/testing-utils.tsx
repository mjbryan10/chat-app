import React from 'react';
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { dark } from './shared/theme';

const AllTheProviders = ({ children }: any) => {
  return (
    <ThemeProvider theme={dark}>
        {children}
    </ThemeProvider>
  )
  
}

const customRender = (ui?: any, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }