fs = require("fs")
file = fs.readFileSync(process.argv[2], "utf8")
let memVar = new Array(6);
let s = "";
for (let i of file.split("\r\n")) {
    s += i + " _ ";
}
let mem = memVar.concat(s.split(" "));
mem.pop()


let ip = 6;
let q = 3;
let sIP;
while (mem [ip] !== "exit") {
    switch (mem[ip]) {
        case "set":
            mem[mem[ip + 1]] = mem[ip + 2]
            ip += 3
        case "#":
            while (mem[ip] !== "_") {
                ip++
            }
            break
        case "_":
            ip++
            break
        case "jmps":
            sIP = ip
            ip++
            break
        case "jmpf":
            ip = sIP
            break
        case "cmp":
            if (mem [ip + 2] === ">" && Number(mem[mem[ip + 1]]) > Number(mem [mem [ip + 3]])) {
                ip += 4
                break
            }
            if (mem [ip + 2] === "==" && Number(mem[mem[ip + 1]]) === Number(mem [mem [ip + 3]])) {
                ip += 4
                break
            }
            if (mem [ip + 2] === "<" && Number(mem[mem[ip + 1]]) < Number(mem [mem [ip + 3]])) {
                ip += 4
                break
            }
            if (mem [ip + 2] === "!=" && Number(mem[mem[ip + 1]]) !== Number(mem [mem [ip + 3]])) {
                ip += 4
                break
            } else {
                ip += 5
                while (mem[ip] !== "_") {
                    ip++
                }
                break
            }
        case "input":
            mem[mem[ip + 1]] = process.argv[q]
            q += 1
            ip += 2
            break
        case "output":
            console.log(mem [mem [ip + 1]])
            ip += 2
            break
        case "add":
            mem [mem [ip + 3]] = mem [mem [ip + 1]] / 1 + mem [mem [ip + 2]] / 1
            ip += 4
            break
        case "diff":
            mem [mem [ip + 3]] = mem [mem [ip + 1]] / 1 - mem [mem [ip + 2]] / 1
            ip += 4
            break
        case "multi":
            mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[mem[ip + 2]]
            ip += 4
            break
    }
}