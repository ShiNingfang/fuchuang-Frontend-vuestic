export type OtherStatus = '' | 'got' | 'waiting' | 'null'

export type OtherData = {
  id: number

  name: string
  owner: {
    id: number
    name: string
    photo: string // 网址，或者是空
  }
  number: number
  description: string

  status: OtherStatus
}
