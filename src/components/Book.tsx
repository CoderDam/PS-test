import { ReactElement, useRef } from 'react'
import { Box, styled, Typography } from '@mui/material'
import { BookType } from '../types'
import { getRandInt } from '../utils'

interface ContainerProps {
  isSelected: boolean
  selectable: boolean
  vertical: boolean
}
const Container = styled(Box)<ContainerProps>(({ theme, isSelected, selectable, vertical }) => ({
  border: '2px solid black',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transformOrigin: 'bottom center',
  transition: theme.transitions.create(
    ['background-color', 'transform'],
    { duration: theme.transitions.duration.complex }
  ),
  width: '100%',
  ...(
    isSelected
      ? {
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.secondary.dark
        }
      : {
          backgroundColor: '#4b3621',
          color: theme.palette.secondary.main
        }
  ),
  ...(
    selectable
      ? {
          cursor: 'pointer',
          ':hover': {
            transform: 'scale(1.1)'
          }
        }
      : {}
  ),
  ...(
    vertical
      ? {
          height: 410,
          writingMode: 'vertical-lr'
        }
      : {
          height: 60,
          maxWidth: 410,
          position: 'relative'
        }
  )
}))

interface Props {
  book: BookType
  isSelected?: boolean
  onClick?: () => void
  selectable?: boolean
  vertical?: boolean
  zIndex?: number
}

function Book ({ book, isSelected = false, onClick, selectable = false, vertical = false, zIndex }: Props): ReactElement {
  const gapRef = useRef(getRandInt(-15, 50))

  return (
    <Container
      isSelected={isSelected}
      selectable={selectable}
      vertical={vertical}
      role='button'
      onClick={(selectable && (onClick != null)) ? onClick : () => null}
      sx={{ left: `${gapRef.current}px`, zIndex }}
    >
      <Typography color='inherit' align='center'>
        ~ <em>{book.title}</em> ~
      </Typography>
    </Container>
  )
}

export default Book
