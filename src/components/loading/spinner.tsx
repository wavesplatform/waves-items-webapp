import React from 'react'
import styled from 'styled-components'

type TProps = {
  size?: number
}

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  
  .path {
    stroke: currentColor;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
`

const Spinner = (props: TProps) => {
  const size = props.size || 44
  return (
    <StyledSpinner width={size} height={size} viewBox='0 0 50 50'>
      <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='5'/>
    </StyledSpinner>
  )
}

export default Spinner
