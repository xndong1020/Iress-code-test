import Robot from './Robot'

const robot = new Robot()
robot.place(3, 3, 1)
console.log(robot.x)
console.log(robot.y)
console.log(robot.direction)

robot.move()
console.log(robot.x)
console.log(robot.y)
console.log(robot.direction)

robot.move()
console.log(robot.x)
console.log(robot.y)
console.log(robot.direction)