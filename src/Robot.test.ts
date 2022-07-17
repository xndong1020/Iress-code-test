import { Direction } from './constants/Direction'
import Robot from './Robot'

describe('Testing Robot Class', () => {
  let robot: Robot

  beforeEach(() => {
    robot = new Robot()
  })

  it('[constructor]: should create a new Robot with default values', () => {
    expect(robot.x).toBe(0)
    expect(robot.y).toBe(0)
    expect(robot.direction).toBe(Direction.NORTH)
  })

  it('[place function]: should place the robot in the correct position based on x,y and direction', () => {
    robot.place(3, 3, Direction.EAST)
    expect(robot.x).toBe(3)
    expect(robot.y).toBe(3)
    expect(robot.direction).toBe(Direction.EAST)
  })

  it('[place function]: should not place the robot if the direction is incorrect, and console error', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    robot.place(3, 3, null)
    expect(robot.x).toBe(0)
    expect(robot.y).toBe(0)
    expect(robot.direction).toBe(Direction.NORTH)
    expect(error).toBeCalledWith(
      'Invalid input. Please check that the input is correct (position, position, direction)'
    )
    error.mockReset()
  })
})
