import { ReactElement, useRef } from 'react'
import { Box, styled, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
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

type BookKeys = 'isbn' | 'price' | 'title' | 'cover' | 'synopsis'
type TooltipType = BookKeys | 'hr' | Array<BookKeys | 'hr'>

interface Props {
  book: BookType
  isSelected?: boolean
  onClick?: () => void
  selectable?: boolean
  tooltipItems?: BookKeys | Array<BookKeys | 'hr'> | false
  vertical?: boolean
  zIndex?: number
}

const getTooltipContent = (book: BookType, tooltipItems: TooltipType): string => {
  let tooltipContent = ''
  if (typeof tooltipItems === 'string') {
    switch (tooltipItems) {
      case 'hr':
        tooltipContent += '<hr />'
        break
      case 'isbn':
        tooltipContent += '<code>'
        tooltipContent += book.isbn
        tooltipContent += '</code>'
        tooltipContent += '<br />'
        break
      case 'price':
        tooltipContent += '<code>'
        tooltipContent += 'Prix : '
        tooltipContent += String(book.price)
        tooltipContent += '€'
        tooltipContent += '</code>'
        tooltipContent += '<br />'
        break
      case 'title':
        tooltipContent += '<big>'
        tooltipContent += '<strong>'
        tooltipContent += book.title
        tooltipContent += '</strong>'
        tooltipContent += '</big>'
        tooltipContent += '<br />'
        break
      case 'cover':
        tooltipContent += `<img src="${book.cover}" alt="${book.title}" />`
        tooltipContent += '<br />'
        break
      default:
        tooltipContent += String(book[tooltipItems])
        tooltipContent += '<br />'
    }
  } else if (Array.isArray(tooltipItems)) {
    tooltipContent += tooltipItems.map((fragment) => getTooltipContent(book, fragment)).join('')
  }
  return tooltipContent
}

function Book ({
  book,
  isSelected = false,
  onClick,
  selectable = false,
  tooltipItems = false,
  vertical = false,
  zIndex
}: Props): ReactElement {
  const gapRef = useRef(getRandInt(-15, 50))
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const content = (
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

  if (tooltipItems === false || isDownMd) {
    return content
  }

  const tooltipContent = getTooltipContent(book, tooltipItems)

  return (
    <Tooltip
      arrow
      title={<span dangerouslySetInnerHTML={{ __html: tooltipContent }} />}
    >
      {content}
    </Tooltip>
  )
}

export default Book
