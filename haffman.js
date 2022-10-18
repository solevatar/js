
let fs = require('fs');
const arg = process.argv;
let mode = arg[2];
if (mode == "codes"){
    let fileOutput = arg[4];
    let inputFile = fs.readFileSync(arg[3], "utf-8")
    
    // построение таблицы чатот
    const freqs = text =>
        [...text].reduce((fs, c) =>
        fs[c] ? (fs[c] = fs[c] + 1, fs)
            : (fs[c] = 1, fs), {});

    // преобразование в массив типа [cимвол,частота]
    const topairs = freqs =>
        Object.keys(freqs).map(c => [c, freqs[c]]);

    //упорядочивание пар в порядка возрастания     
    const sortps = pairs =>
        pairs.sort((a, b) => a[1] - b[1]);

    // построение дерева   
    const tree = ps =>
        ps.length < 2
        ? ps[0]
        : tree(sortps([[ps.slice(0, 2), ps[0][1] + ps[1][1]]].concat(ps.slice(2))));

    // построение таблицы кодов 
    const codes = (tree, pfx = "") =>
        tree[0] instanceof Array
        ? Object.assign(codes(tree[0][0], pfx + "0"),
            codes(tree[0][1], pfx + "1"))
            : {[tree[0]]: pfx};

    // функция для совмещения всех предыдущих функций 
    const getCodes = file => {
        return codes(tree(sortps(topairs(freqs(file)))))
    }
    let code = {};

    // условия для случая с одним символом 
    if (new Set(inputFile).size == 1) {
        code[inputFile.charAt(0)] = "0";
    } else {
        code = getCodes(inputFile);
    }

    fs.writeFileSync(fileOutput, "");
    
    // кодировка строки с помощью дерева 
    for (i of inputFile) {
    fs.appendFileSync(fileOutput, code[i]);
    }
    console.log(code);

    // создание словаря 
    const swap = obj => {
        const ret = {};
        Object.keys(obj).forEach(key => {
            ret[obj[key]] = key;
        });
        return ret;
    }
    
    fs.writeFileSync("decode.json", JSON.stringify(swap(code)));
    console.log(code)
}

if (mode == "decode") {

  let inputFile = arg[3];
  let fileHelp = arg[4];
  let fileOutput = arg[5];
  fs.writeFileSync(fileOutput, "");

  let inputFiles = fs.readFileSync(inputFile, "utf-8");
  let treeCodes = JSON.parse(fs.readFileSync(fileHelp, "utf-8"));
  
  let i = 0;

  while (i < inputFiles.length) {
    for (code in treeCodes){
      if (inputFiles.startsWith(code, i)) {
        fs.appendFileSync(fileOutput, treeCodes[code]);
        i += code.length;
      }
    }
  }
}

