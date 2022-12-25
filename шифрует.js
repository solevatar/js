import fs from "fs";
import {code} from "./encrypted.mjs";
import {freqSymbol} from  "./encrypted.mjs";

let alph = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
let wikiFreq = [8.01, 1.59, 4.54, 1.7, 2.98, 8.45, 0.03, 0.94, 1.65, 7.35, 1.21, 3.49, 4.4, 3.21, 6.7, 10.97,
    2.81, 4.73, 5.47, 6.26, 2.62, 0.26, 0.97, 0.48, 1.44, 0.73, 0.36, 0.04, 1.9, 1.74, 0.32, 0.64, 2.01];

switch (process.argv[2]){
    case "code":
        let text1 = fs.readFileSync(process.argv[3]).toString().toLowerCase();
        fs.writeFileSync("codedText.txt",code(6,alph,text1))
        break
    case "decode":
        let cipher = fs.readFileSync(process.argv[3]).toString().toLowerCase();
        let text2;
        let myfreq;
        let shift;
        let sum;
        let min = 10000;
        for (let i = 0; i < alph.length;i++) {
            sum = 0;
            text2 = code(i, alph, cipher);
            myfreq = freqSymbol(alph,text2)
            for (let j = 0; j < wikiFreq.length; j++)
                sum += (wikiFreq[j] - myfreq[j]) ** 2;
            if (min > sum){
                min=sum;
                shift = i;
            }
        }
        console.log(code(shift,alph,cipher))
}