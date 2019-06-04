import styled from 'styled-components'
import { Box, Card, Flex, FlexProps, Heading } from 'rebass'
import { IconButton } from '../buttons'
import { themeGet } from 'styled-system'

export const modalStyles = (maxWidth: number = 360) => {
  return {
    overlay: {
      background: 'rgba(3, 6, 15, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'visible',
      overflowX: 'hidden',
      zIndex: 998,
      padding: '1.2rem',
    },
    content: {
      background: 'none',
      borderRadius: 0,
      position: 'relative',
      border: 0,
      overflow: 'visible',
      padding: 0,
      zIndex: 999,
      width: '100%',
      maxWidth: `${maxWidth}px`,
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
    },
  }
}

export const ModalBody = styled(Card)`
  border-radius: ${themeGet('radii.lg')}px;
  position: relative;
`
ModalBody.defaultProps = {
  bg: 'grays.8',
}

interface HeaderProps extends FlexProps {
  ignoreHeader?: boolean
}

export const Header = styled(Flex)<HeaderProps>`
  display: ${props => (props.ignoreHeader ? 'none' : 'flex')};
  border-bottom: 1px solid ${themeGet('colors.border.modal')};
`
Header.defaultProps = { p: 'xl' }

export const Title = styled(Heading)`
`
Title.defaultProps = { fontSize: 'lg' }

export const CloseButton = styled(IconButton).attrs({
  glyph: 'close',
})`
  position: absolute;
  top: 0;
  right: -52px;
`

export const Content = styled(Box)`
`
Content.defaultProps = { p: 'xl' }
