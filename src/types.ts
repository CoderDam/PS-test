export interface BookType {
  isbn: string
  price: number
  title: string
  cover: string
  synopsis: string[]
}

export interface OfferType {
  type: 'percentage' | 'minus' | 'slice'
  value: number
  sliceValue?: number
}

export interface CompleteOfferType extends OfferType {
  discount: number
}

export interface ErrorType {
  message: string
}
