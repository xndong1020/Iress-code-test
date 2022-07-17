import { Direction } from './constants/Direction'
import { Points } from './typings/interfaces'

class Robot {
  public x: number
  public y: number
  public direction: number

  constructor(private tableBoundaries: Points = { x: 5, y: 5 }) {
    this.x = 0
    this.y = 0
    this.tableBoundaries = tableBoundaries
    this.direction = Direction.NORTH
  }

  place(x: number, y: number, direction: number) {
    if (
      x < this.tableBoundaries.x &&
      x >= 0 &&
      this.y < this.tableBoundaries.y &&
      y >= 0 &&
      this.isValidDirection(direction)
    ) {
      this.x = x
      this.y = y
      this.direction = direction
    } else {
      console.error(
        'Invalid input. Please check that the input is correct (position, position, direction)'
      )
    }
  }

  isValidDirection(direction: number) {
    return Object.values(Direction).includes(direction)
  }
}

export default Robot
