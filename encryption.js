var CryptoJS = require("crypto-js");
require("dotenv").config();

//TODO ———————————————[Config SecretKey]———————————————
var secretkey = process.env.secretkey;
var secretkeyHash = CryptoJS.SHA256(secretkey).toString(CryptoJS.enc.Hex);
//TODO ————————————————————————————————————————————————

var string =
  "U2FsdGVkX18zKt6geET+Yk/hhYxiYjl73gfO/takLXKOOgPQe+HCPY6tmscr9quq/Cm2XTqv2YsLmHMj7u9rp8Wt6EAn8bDdD4kYgq72Vx7CGix4wKaNdMUKCQGN8T3FPRA5l/k430xwjAGfi/L/laZR9/ZzDvdO5fJXpZQrbRjAU0sqRruAo6Un/qlg9iKLMIj7EUqbzM0WfehdKgtl3fVHSd+myMH4v3pU8qyOhC9LPTA+XMIYBofwfkWiAZJxXvaXM9g4iV1QDUXrIIqU3ygk+yxblogZ/N7kVeUfjxde/gt8A0Y3vQ14E6riLl65YhU9D6HRClRCyUQXmjL3aAdDmAfeuktObpo5W6Mp8xusOQyV/Jb3gS0C9x/jdqjeYyLTZKj3xTEy2bEmbgqZqUzGeXBQtvmCK6ij1dp0KeWHQZb9R/0R5YFTXHd9HT2RZV8Tbf1fDBZmZJByUSBUtrTkMGe25jZI+9riECaFZifOA7hQQqAcM+wg4Nq3wlyuP07yBRUuZFg8DWCECi4jjgu7vti5yYNku/33R9e+nW+6kXfH6cHEbhmNdEXCk8sudLwl3v1ERZ9Hwij20laSWxwu6wo/9YpRv0rjAQA823I+LaxVDrIrXHvziBHohmYZ8DulDsXXwJ2DmRGVu39Rtska3QFiMr76Vop+Izc045V9zNoU176xFtNLvPZY6z54e05We7gbDuXWNvspJHRWHcL/5u1/w1vPNPkzo+JzaLFumkmuq363KeGKXTSFZ+MEqrYbzocZfzRymBqDFBgbLKPtchWcD38YOJdmQc49D31S3xBKtaR3aa/N1KoI7CFMcRwQwcWkWObUiK+yC+qWZQWoKWd1zv0em4oRus+qOpU=";

console.log(
  JSON.parse(
    CryptoJS.AES.decrypt(string, secretkeyHash).toString(CryptoJS.enc.Utf8),
  ),
);
