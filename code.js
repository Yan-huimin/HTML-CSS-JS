const codeBox = document.getElementById("code-box");

const codeLines = [
    "   #Page_1 Welcome to my game!",
    "      - :smile: This game is made by YHM",
    "      - :zap: Here is my Email : yhm2234489774@outlook.com",
    "      - :fire: I hope you can enjoy my game!",

    "",
    "   #Page_2 How to play?",
    "      - Mouse_right_click : To move yourself.",
    "      - R + Mouse_left_click : To use your skill.",

    "",
    "   Tips: You should login first to play! :smile:"
];

let lineIndex = 0;
let charIndex = 0;

function typeCode() {
    if (lineIndex < codeLines.length) {
        const currentLine = codeLines[lineIndex];
        if (charIndex < currentLine.length) {
            codeBox.innerHTML += currentLine[charIndex++];
        } else {
            codeBox.innerHTML += "<br>";
            lineIndex++;
            charIndex = 0;
        }

        // 滚动到最新内容
        codeBox.scrollTop = codeBox.scrollHeight;

        setTimeout(typeCode, Math.random() * 100 + 50);
    }
}

typeCode();
