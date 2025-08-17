export interface Label{
  "id": number
  "index": string|number
  "prop": string|number
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
  "lowLevel": number[]
  "highLevel": number[]
  "position": number
  "grey": boolean
  "sectorName"?: string
  "drawAnyCase": boolean
}