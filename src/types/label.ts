export interface Label {
  "id": number
  "index": number
  "prop": number
  "typeText": string
  "numText": string
  "type": string
  "num": number
  "score": number
  "isBase": boolean
  "connections": number[]
  "secStart": boolean
  "secEnd": boolean
  "fontStyle": string
  "arrowOut": boolean
  "arrowIn": boolean
  "level": number
  "isLabel": boolean
  "secLength": number
  "grey": boolean
  "sectorName"?: string
  "drawAnyCase": boolean
  "sLevel"?:number
  "object"?:Label
}