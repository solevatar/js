let fs = require("fs");
let arg = process.argv;

let mode = arg[2];
let input = arg[3];
let output = arg[4];

let inText = fs.readFileSync(input, "utf-8");
let outText = "";
let n = 1;

const codeFile = (inText) => {
    for ( let i = 0; i< inText.length;i++ ){
        if (inText.charAt(i) == inText.charAt(i+1)){
            n = n+1;
            }
        else{
            if ((n >=4) || (inText.charAt(i) == "#")){
                outText +=  '#' + String.fromCharCode(n) + inText.charAt(i);
                n=1;
            }
            else{
                outText += inText.charAt(i).repeat(n)
            }
            n=1;
        };
    }
    fs.writeFileSync(output, outText);
}

const decodeFile = (inText) => {
    for (let i = 0; i < inText.length;i++){
        if (inText.charAt(i) =='#'){
            outText += inText.charAt(i+2).repeat(inText.charCodeAt(i+1));
            i += 2;
        } else {
            outText += inText.charAt(i);
        }
    }
    fs.writeFileSync(output, outText);
};

if (mode == "code") {
    codeFile(inText);
}
if (mode == "decode") {
    decodeFile(inText);
}