export interface InputCreateOrderDto {
  id: string
  number: number
  customerId: string
  observation: string
  situationId: string
  dataCreated: Date
  items: Array<InpuCreateOrderItemDto>
}

export interface InpuCreateOrderItemDto {
  id: string
  productId: string
  productDescription: string
  productPrice: number
  quantity: number
  active: boolean
  dataCreated: Date
  numberOrder?: number
}
