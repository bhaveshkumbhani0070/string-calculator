export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const numbers = searchParams.get('numbers');
  
    function parseNumbers(numbers) {
      let delimiter = /,|\n/;
      let numberString = numbers;
  
      if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf('\n');
        const customDelimiter = numbers.substring(2, delimiterEndIndex);
        delimiter = new RegExp(customDelimiter);
        numberString = numbers.substring(delimiterEndIndex + 1);
      }
      return numberString.split(delimiter);
    }
  
    if (!numbers) {
      return new Response(JSON.stringify({ sum: 0 }), { status: 200 });
    }
  
    const numberList = parseNumbers(numbers);
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
      return new Response(JSON.stringify({ error: `Negative numbers not allowed: ${negatives.join(", ")}` }), { status: 400 });
    }
    return new Response(JSON.stringify({ sum }), { status: 200 });
  }