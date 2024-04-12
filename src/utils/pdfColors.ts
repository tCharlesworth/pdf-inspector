// https://www.npmjs.com/package/pdf2json#dictionary-reference
const kColors = [
  '#000000',		// 0
  '#ffffff',		// 1
  '#4c4c4c',		// 2
  '#808080',		// 3
  '#999999',		// 4
  '#c0c0c0',		// 5
  '#cccccc',		// 6
  '#e5e5e5',		// 7
  '#f2f2f2',		// 8
  '#008000',		// 9
  '#00ff00',		// 10
  '#bfffa0',		// 11
  '#ffd629',		// 12
  '#ff99cc',		// 13
  '#004080',		// 14
  '#9fc0e1',		// 15
  '#5580ff',		// 16
  '#a9c9fa',		// 17
  '#ff0080',		// 18
  '#800080',		// 19
  '#ffbfff',		// 20
  '#e45b21',		// 21
  '#ffbfaa',		// 22
  '#008080',		// 23
  '#ff0000',		// 24
  '#fdc59f',		// 25
  '#808000',		// 26
  '#bfbf00',		// 27
  '#824100',		// 28
  '#007256',		// 29
  '#008000',		// 30
  '#000080',		// Last + 1
  '#008080',		// Last + 2
  '#800080',		// Last + 3
  '#ff0000',		// Last + 4
  '#0000ff',		// Last + 5
  '#008000',		// Last + 6
  '#000000'		// Last + 7
];

export function PDFColorToHex(clr: number):string {
  return kColors[clr] || "#000000"
}