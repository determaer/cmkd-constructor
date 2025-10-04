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

export function instanceOfLabel(label: any): label is Label {
  return(
    'id' in label &&
    "index" in label &&
    "prop" in label &&
    "typeText" in label &&
    "numText" in label &&
    "type" in label &&
    "num" in label &&
    "score" in label &&
    "isBase" in label &&
    "connections" in label &&
    "secStart" in label &&
    "secEnd" in label &&
    "fontStyle" in label &&
    "arrowOut" in label &&
    "arrowIn" in label &&
    "level" in label &&
    "isLabel" in label &&
    "secLength" in label &&
    "grey" in label &&
    "drawAnyCase" in label
    )
}