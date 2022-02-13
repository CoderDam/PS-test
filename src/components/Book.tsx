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
          color: theme.palette.secondary.dark,
          visibility: 'hidden'
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
          maxWidth: 80,
          writingMode: 'vertical-rl'
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

export interface BookProps {
  book: BookType
  isSelected?: boolean
  onClick?: () => void
  search?: string
  tooltipItems?: BookKeys | Array<BookKeys | 'hr'> | false
  tooltipPlacement?:
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'bottom-end'
  | 'bottom-start'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start'
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
        tooltipContent += book.price.toLocaleString(undefined, { minimumFractionDigits: 2 })
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
  search = '',
  tooltipItems = false,
  tooltipPlacement = 'bottom',
  vertical = false,
  zIndex
}: BookProps): ReactElement {
  const gapRef = useRef(getRandInt(-15, 50))
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const splitTitle = book.title.toLowerCase().split(search.toLowerCase())

  const content = (
    <Container
      isSelected={isSelected}
      selectable={onClick != null}
      vertical={vertical}
      role='button'
      onClick={onClick != null ? onClick : () => null}
      sx={{ left: `${gapRef.current}px`, zIndex }}
    >
      <Typography color='inherit' align='center' sx={{ textTransform: 'capitalize' }}>
        ~
        {' '}
        <em
          dangerouslySetInnerHTML={{
            __html: search.length > 0
              ? splitTitle.join(`<mark>${search.toLowerCase()}</mark>`)
              : book.title
          }}
        />
        {' '}
        ~
      </Typography>
    </Container>
  )

  if (tooltipItems === false || isDownMd) {
    return content
  }

  const tooltipContent = getTooltipContent(book, tooltipItems)

  return (
    <Tooltip
      placement={tooltipPlacement}
      title={<span dangerouslySetInnerHTML={{ __html: tooltipContent }} />}
    >
      {content}
    </Tooltip>
  )
}

export default Book
