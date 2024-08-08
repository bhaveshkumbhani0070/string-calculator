class StringCalculator {
    add(numbers) {
      if (!numbers) return 0;
  
      let delimiter = /,|\n/;
      let numberString = numbers;
  
      if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf('\n');
        const customDelimiter = numbers.substring(2, delimiterEndIndex);
        delimiter = new RegExp(customDelimiter);
        numberString = numbers.substring(delimiterEndIndex + 1);
      }
  
      const numberList = numberString.split(delimiter);
      let sum = 0;
      const negatives = [];
  
      numberList.forEach(num => {
        if (num) {
          const number = parseInt(num, 10);
          if (number < 0) {
            negatives.push(number);
          }
          sum += number;
        }
      });
  
      if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
      }
  
      return sum;
    }
}
function runTests() {
  const calculator = new StringCalculator();

  try {
    console.assert(calculator.add('') === 0, 'Test 1 Failed: Expected 0 for an empty string');
    console.assert(calculator.add('1') === 1, 'Test 2 Failed: Expected 1 for input "1"');
    console.assert(calculator.add('1,2') === 3, 'Test 3 Failed: Expected 3 for input "1,2"');
    console.assert(calculator.add('1,2,3') === 6, 'Test 4 Failed: Expected 6 for input "1,2,3"');
    console.assert(calculator.add('1\n2,3') === 6, 'Test 5 Failed: Expected 6 for input "1\n2,3"');
    console.assert(calculator.add('//;\n1;2') === 3, 'Test 6 Failed: Expected 3 for input "//;\n1;2"');
    console.assert(calculator.add('//|\n2|3|4') === 9, 'Test 7 Failed: Expected 9 for input "//|\n2|3|4"');

    try {
      calculator.add('1,-2,3');
      console.assert(false, 'Test 8 Failed: Should have thrown an error for negative number');
    } catch (e) {
      console.assert(e.message === 'Negative numbers not allowed: -2', 'Test 8 Failed: Expected error message for negative number');
    }

    try {
      calculator.add('//;\n-1;-2');
      console.assert(false, 'Test 9 Failed: Should have thrown an error for negative numbers');
    } catch (e) {
      console.assert(e.message === 'Negative numbers not allowed: -1, -2', 'Test 9 Failed: Expected error message for multiple negative numbers');
    }

    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

runTests();