import { range } from "."

let temperatures = range(27, 43, 1)
let humidities = range(40, 100, 5)

let table = [
  [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
  [26, 27, 27, 28, 29, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
  [26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 39, 39, 40, 41, 42, 43],
  [27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 40, 40, 41, 42, 43, 44],
  [28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 41, 41, 42, 43, 44, 45],
  [28, 29, 31, 32, 33, 34, 36, 37, 38, 39, 40, 42, 42, 43, 44, 45, 46],
  [29, 30, 31, 33, 34, 35, 36, 38, 39, 40, 41, 43, 43, 44, 45, 46, 47],
  [30, 31, 32, 33, 35, 36, 37, 39, 40, 41, 42, 44, 44, 45, 46, 47, 48],
  [30, 32, 33, 34, 36, 37, 38, 40, 41, 42, 43, 45, 45, 46, 47, 48, 49],
  [31, 32, 34, 35, 37, 38, 39, 41, 42, 43, 44, 46, 46, 47, 48, 49, 50],
  [32, 33, 35, 36, 37, 39, 40, 42, 43, 44, 45, 47, 47, 48, 49, 50, 51],
  [33, 34, 35, 37, 38, 40, 41, 43, 44, 45, 46, 48, 48, 49, 50, 51, 52],
  [33, 35, 36, 38, 39, 41, 42, 44, 45, 46, 47, 49, 49, 50, 51, 52, 53]
]

export type Chart = {
  temperatures: number[],
  humidities: number[],
  table: { value: number, colour: string }[][]
}

export const getChart = (): Chart => ({
  temperatures,
  humidities,
  table: table.map(row => row.map(value => ({ value, colour: getColour(value) })))
})

export type Colour = 'white' | 'green' | 'yellow' | 'red' | 'black'

let getColour = (wbgt: number): Colour => {
  if (wbgt < 30) {
    return 'white'
  } else if (wbgt == 30) {
    return 'green'
  } else if (wbgt == 31) {
    return 'yellow'
  } else if (wbgt == 32) {
    return 'red'
  } else {
    return 'black'
  }
}

export type WBGT = {
  value: number,
  colour: string
}

function getIndex(value: number, array: number[]): number {
  let start = 0;
  let end = array.length - 1;
  let mid = Math.floor((start + end) / 2);

  while (start <= end) {
    if (array[mid] === value) {
      return mid;
    }

    if (value < array[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }

    mid = Math.floor((start + end) / 2);
  }

  if (value - array[mid] < array[mid + 1] - value) {
    return mid
  } else {
    return mid + 1
  }
}

export function getWBGT(temp: number, rh: number): WBGT {
  let tempIndex = getIndex(temp, temperatures)
  let rhIndex = getIndex(rh, humidities)

  let value = table[rhIndex][tempIndex]
  return {
    value,
    colour: getColour(value)
  }
}