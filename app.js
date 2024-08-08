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

  const calculator = new StringCalculator();
  console.log(calculator.add(""));  
  console.log(calculator.add("1")); 
  console.log(calculator.add("1,5"));
  console.log(calculator.add("1\n2,3")); 
  console.log(calculator.add("//;\n1;2"));