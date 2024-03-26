export type OtherStatus = '' | 'got' | 'waiting' | 'null'

export type OtherData = {
  id: number

  name: string
  owner: number
  number: number
  description: string

  status: OtherStatus
}