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

  it('[move function]: should move the robot forward north', () => {
    robot.move()
    expect(robot.x).toBe(0)
    expect(robot.y).toBe(1)
    expect(robot.direction).toBe(Direction.NORTH)
  })

  it('[move function]: should move the robot forward east', () => {
    robot.place(3, 3, Direction.EAST)
    robot.move()
    expect(robot.x).toBe(4)
    expect(robot.y).toBe(3)
    expect(robot.direction).toBe(Direction.EAST)
  })

  it('[move function]: should move the robot forward south', () => {
    robot.place(3, 3, Direction.SOUTH)
    robot.move()
    expect(robot.x).toBe(3)
    expect(robot.y).toBe(2)
    expect(robot.direction).toBe(Direction.SOUTH)
  })

  it('[move function]: should move the robot forward west', () => {
    robot.place(3, 3, Direction.WEST)
    robot.move()
    expect(robot.x).toBe(2)
    expect(robot.y).toBe(3)
    expect(robot.direction).toBe(Direction.WEST)
  })

  it('[move function]: should not move the robot past the boundary of the grid', () => {
    robot.place(4, 4, Direction.NORTH)
    robot.move()
    expect(robot.x).toBe(4)
    expect(robot.y).toBe(4)
    expect(robot.direction).toBe(Direction.NORTH)

    robot.right()
    robot.move()
    expect(robot.x).toBe(4)
    expect(robot.y).toBe(4)
    expect(robot.direction).toBe(Direction.EAST)
  })

  it('[right function]: should rotate the robot right', () => {
    robot.right()
    robot.move()
    expect(robot.x).toBe(1)
    expect(robot.y).toBe(0)
    expect(robot.direction).toBe(Direction.EAST)
  })

  it('[right function]: should rotate the robot right multiple times', () => {
    robot.place(3, 3, Direction.NORTH)
    robot.right()
    robot.right()
    robot.move()
    expect(robot.x).toBe(3)
    expect(robot.y).toBe(2)
    expect(robot.direction).toBe(Direction.SOUTH)
  })

  it('[right function]: should reset the robot to NORTH after 4 right rotations', () => {
    robot.right()
    robot.right()
    robot.right()
    robot.right()

    expect(robot.x).toBe(0)
    expect(robot.y).toBe(0)
    expect(robot.direction).toBe(Direction.NORTH)
  })

  it('[left function]: should rotate the robot left', () => {
    robot.left()
    robot.left()
    robot.move()
    expect(robot.x).toBe(0)
    expect(robot.y).toBe(0)
    expect(robot.direction).toBe(Direction.SOUTH)
  })

  it('[left function]: should rotate the robot left multiple times', () => {
    robot.place(0, 0, Direction.EAST)
    robot.left()
    robot.left()
    robot.move()
    expect(robot.x).toBe(0)
    expect(robot.y).toBe(0)
    expect(robot.direction).toBe(Direction.WEST)
  })

  it('[left function]: should reset the robot to WEST after 5 left rotations', () => {
    robot.left()
    expect(robot.direction).toBe(Direction.WEST)

    robot.left()
    robot.left()
    robot.left()
    robot.left()
    expect(robot.x).toBe(0)
    expect(robot.y).toBe(0)
    expect(robot.direction).toBe(Direction.WEST)
  })
})
