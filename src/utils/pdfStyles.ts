// https://www.npmjs.com/package/pdf2json#dictionary-reference

const kFontFaces = [
  "QuickType,Arial,Helvetica,sans-serif",							// 00 - QuickType - sans-serif variable font
  "QuickType Condensed,Arial Narrow,Arial,Helvetica,sans-serif",	// 01 - QuickType Condensed - thin sans-serif variable font
  "QuickTypePi",													// 02 - QuickType Pi
  "QuickType Mono,Courier New,Courier,monospace",					// 03 - QuickType Mono - san-serif fixed font
  "OCR-A,Courier New,Courier,monospace",							// 04 - OCR-A - OCR readable san-serif fixed font
  "OCR B MT,Courier New,Courier,monospace"							// 05 - OCR-B MT - OCR readable san-serif fixed font
];

export type StyleRecord = [number, number, 0|1, 0|1]
const kFontStyles: Array<StyleRecord> = [
   // Face		Size	Bold	Italic		StyleID(Comment)
   // -----	----	----	-----		-----------------
       [0,		6,		0,		0],			//00
       [0,		8,		0,		0],			//01
       [0,		10,		0,		0],			//02
       [0,		12,		0,		0],			//03
       [0,		14,		0,		0],			//04
       [0,		18,		0,		0],			//05
       [0,		6,		1,		0],			//06
       [0,		8,		1,		0],			//07
       [0,		10,		1,		0],			//08
       [0,		12,		1,		0],			//09
       [0,		14,		1,		0],			//10
       [0,		18,		1,		0],			//11
       [0,		6,		0,		1],			//12
       [0,		8,		0,		1],			//13
       [0,		10,		0,		1],			//14
       [0,		12,		0,		1],			//15
       [0,		14,		0,		1],			//16
       [0,		18,		0,		1],			//17
       [0,		6,		1,		1],			//18
       [0,		8,		1,		1],			//19
       [0,		10,		1,		1],			//20
       [0,		12,		1,		1],			//21
       [0,		14,		1,		1],			//22
       [0,		18,		1,		1],			//23
       [1,		6,		0,		0],			//24
       [1,		8,		0,		0],			//25
       [1,		10,		0,		0],			//26
       [1,		12,		0,		0],			//27
       [1,		14,		0,		0],			//28
       [1,		18,		0,		0],			//29
       [1,		6,		1,		0],			//30
       [1,		8,		1,		0],			//31
       [1,		10,		1,		0],			//32
       [1,		12,		1,		0],			//33
       [1,		14,		1,		0],			//34
       [1,		18,		1,		0],			//35
       [1,		6,		0,		1],			//36
       [1,		8,		0,		1],			//37
       [1,		10,		0,		1],			//38
       [1,		12,		0,		1],			//39
       [1,		14,		0,		1],			//40
       [1,		18,		0,		1],			//41
       [2,		8,		0,		0],			//42
       [2,		10,		0,		0],			//43
       [2,		12,		0,		0],			//44
       [2,		14,		0,		0],			//45
       [2,		12,		0,		0],			//46
       [3,		8,		0,		0],			//47
       [3,		10,		0,		0],			//48
       [3,		12,		0,		0],			//49
       [4,		12,		0,		0],			//50
       [0,		9,		0,		0],			//51
       [0,		9,		1,		0],			//52
       [0,		9,		0,		1],			//53
       [0,		9,		1,		1],			//54
       [1,		9,		0,		0],			//55
       [1,		9,		1,		0],			//56
       [1,		9,		1,		1],			//57
       [4,		10,		0,		0],			//58
       [5,		10,		0,		0],			//59
       [5,		12,		0,		0]			//60
];

export function GetStyleRecord(code: number): StyleRecord {
  return kFontStyles[code]
}

export function GetFontFromCode(code: number):string {
  return kFontFaces[code]
}