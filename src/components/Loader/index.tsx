/* from https://freefrontend.com/css-loaders/ & https://codepen.io/ikoshowa/pen/qOMvpy/ */
import { ReactElement } from 'react'

import './style.css'

function Loader ({ ratio = 1 }: { ratio?: number }): ReactElement {
  const marginBottom = `${-16 * (1 - ratio)}%`

  return (
    <div className='bookshelf_container' style={{ transform: `scale(${ratio})`, marginBottom }}>
      <div className='bookshelf_wrapper'>
        <ul className='books_list'>
          <li className='book_item first' />
          <li className='book_item second' />
          <li className='book_item third' />
          <li className='book_item fourth' />
          <li className='book_item fifth' />
          <li className='book_item sixth' />
        </ul>
        <div className='shelf' />
      </div>
    </div>
  )
}

export default Loader
