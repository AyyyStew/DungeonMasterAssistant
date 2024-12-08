export function evaluateDiceRoll(expression: string): number {
  if (!expression) {
    return 0;
  }

  // Helper function to evaluate arithmetic expressions safely
  const evalExpression = (expr: string): number => {
    // Replace ^ with ** for exponentiation since JavaScript uses ** for exponentiation
    expr = expr.replace(/\^/g, "**");
    try {
      return new Function(`return (${expr})`)();
    } catch (error) {
      throw new Error(`Invalid arithmetic expression: ${expr}`);
    }
  };

  // Helper function to roll dice
  const rollDice = (times: number, sides: number): number => {
    let total = 0;
    for (let i = 0; i < times; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
  };

  // Recursively resolve the most nested dice expressions first
  const resolveDiceExpressions = (expr: string): string => {
    const diceRegex = /(\d+|\(.+?\))d(\d+|\(.+?\))/g;

    while (diceRegex.test(expr)) {
      expr = expr.replace(diceRegex, (match, numDice, diceSides) => {
        const times = evalExpression(resolveDiceExpressions(numDice));
        const sides = evalExpression(resolveDiceExpressions(diceSides));

        if (isNaN(times) || isNaN(sides)) {
          throw new Error("Invalid dice expression");
        }

        return rollDice(times, sides).toString();
      });
    }

    return expr;
  };

  // Evaluate the entire expression after resolving all dice rolls
  const finalExpression = resolveDiceExpressions(expression);

  return evalExpression(finalExpression);
}
