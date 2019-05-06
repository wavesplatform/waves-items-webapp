import React from 'react'
import styled from 'styled-components'
import { Box } from 'rebass'

export const Grid = styled(Box)`
  display: grid;
`

export const ViewGrid = styled(Grid)`
  grid-template-columns: 16rem 1fr;
  grid-row-gap: 0;
  grid-column-gap: 1rem;
`

export const ViewSide = styled(Box)`
`

export const ViewContent = styled(Box)`
`

export const Container = styled(Box)`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`

export const Section = styled(Box)`

`
