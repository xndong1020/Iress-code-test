import { Direction } from '../constants/Direction'

export const placeCommandParser = (
  command: string
): { x: number; y: number; direction: number } | undefined => {
  if (!command) return
  const bits = command.split(/[ ,]+/)
  if (bits.length !== 4) return

  // To check Direction is valid
  if (!bits[3] || !Object.keys(Direction).includes(bits[3].toUpperCase()))
    return

  // To check x, y are numbers
  if (bits.slice(1, 3).some(bit => isNaN(Number(bit)))) return
  
  return {
    x: parseInt(bits[1]),
    y: parseInt(bits[2]),
    direction: Direction[bits[3].toUpperCase()]
  }
}
