import { Direction } from './constants/Direction'
import { Points } from './typings/interfaces'

class Robot {
  public x: number
  public y: number
  public direction: number
  public placed: boolean

  constructor(private tableBoundaries: Points = { x: 5, y: 5 }) {
    this.x = 0
    this.y = 0
    this.tableBoundaries = tableBoundaries
    this.direction = Direction.NORTH
    this.placed = false
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
      this.placed = true
    } else {
      console.error(
        'Invalid input. Please check that the input is correct (position, position, direction)'
      )
    }
  }

  move() {
    switch (this.direction) {
      case Direction.NORTH:
        this.y + 1 < this.tableBoundaries.y ? this.y++ : null
        break
      case Direction.EAST:
        this.x + 1 < this.tableBoundaries.x ? this.x++ : null
        break
      case Direction.SOUTH:
        this.y >= 1 ? this.y-- : null
        break
      case Direction.WEST:
        this.x >= 1 ? this.x-- : null
        break
    }
  }

  left() {
    return this.direction <= 1
      ? (this.direction = Direction.WEST)
      : this.direction--
  }

  right() {
    return this.direction + 1 > Object.keys(Direction).length
      ? (this.direction = Direction.NORTH)
      : this.direction++
  }

  report() {
    return `${this.x},${this.y},${this.getDirectionName()}`
  }

  isValidDirection(direction: number) {
    return Object.values(Direction).includes(direction)
  }

  getDirectionName() {
    for (const dir in Direction) {
      if (this.direction === Direction[dir]) return dir
    }
  }
}

export default Robot
