import { Console } from "@woowacourse/mission-utils";
import Input from "../Input/Input.js";
import InputValidator from "../utils/InputValidator.js";
import Compare from "../Compare/CompareNumber.js";
import RandomNumberGenerator from "../utils/RandomNumberGenerator.js";
import Output from "../Output/Output.js";

class BaseballGame {
  #baseball;

  constructor() {
    this.#baseball = new Compare(RandomNumberGenerator.generateRandomNumber(3));
  }

  async startGame() {
    Output.printStartMessage();
    await this.inputUserNumber();
  }

  async inputUserNumber() {
    await Input.readUserInputNumber((input) => {
      InputValidator.validateUserInputNumber(input);
      this.calculateCount(input);
    });
  }

  calculateCount(input) {
    const inputNumber = Array.from(input, Number);
    const strikeCount = this.#baseball.getStrikeCount(inputNumber);
    const ballCount = this.#baseball.getBallCount(inputNumber, strikeCount);

    return this.checkHint(strikeCount, ballCount);
  }

  checkHint(strikeCount, ballCount) {
    Output.printHintMessage(ballCount, strikeCount);

    if (strikeCount === 3) {
      Output.printEndMessage();
    }
  }
}

export default BaseballGame;
