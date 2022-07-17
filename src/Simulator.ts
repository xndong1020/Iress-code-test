import inquirer from 'inquirer'
import { Commands } from './constants/Commands'
import Robot from './Robot'
import { placeCommandParser } from './utils/commandParser'

class Simulator {
  constructor(private robot: Robot) {}

  async showMenuPrompt() {
    const cmd = await inquirer.prompt({
      type: 'input',
      name: 'action',
      message: 'Welcome to the [TOY ROBOT APP]. Please Enter a command: '
    })

    if (cmd.action.toUpperCase() === Commands.EXIT) {
      console.info('Exiting application... Bye!')
      return process.exit(0)
    }

    this.parseCommandsFromPrompt(cmd.action.trim().toUpperCase())
  }

  parseCommandsFromPrompt(command: string) {
    if (!command.includes(Commands.PLACE) && !this.robot.placed) {
      console.error(`Skipping command ${command},robot must be placed first`)
    } else {
      console.info(`Executing ${command}`)
      this.executeCommand(command)
      console.info('Command executed')
    }

    return this.showMenuPrompt()
  }

  executeCommand(command: string) {
    if (command.includes(Commands.PLACE)) {
      const placeCommand = placeCommandParser(command)
      if (!!placeCommand) {
        this.robot.place(placeCommand.x, placeCommand.y, placeCommand.direction)
      } else {
        console.error('Invalid place command')
      }
    } else {
      switch (command) {
        case Commands.MOVE:
          this.robot.move()
          break
        case Commands.LEFT:
          this.robot.left()
          break
        case Commands.RIGHT:
          this.robot.right()
          break
        case Commands.REPORT:
          console.info('Show Current Location')
          console.info(this.robot.report())
          break
        default:
          console.error('\n[ERROR]: Invalid command\n')
          break
      }
    }
  }
}

export default Simulator
