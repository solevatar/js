export function code(s,alph,text){
    let strNew = "";

    for (let i = 0; i < text.length; i++) {
        if (alph.indexOf(text[i]) === -1)
            strNew+=text[i];
        else
            strNew += alph[(alph.indexOf(text[i]) + s) % 33];
    }
    return strNew
}

export function freqSymbol(alph,text){
    let count=0;
    let myfreq = [];
    for (let i = 0; i < 33; i++) myfreq[i] = 0;
    for (let i = 0; i < text.length; i++) {
        if (alph.indexOf(text[i]) === -1)
            continue;
        count+=1
        myfreq[alph.indexOf(text[i])] += 1;

    }
    for (let i = 0; i < 33; i++)
        myfreq[i] =myfreq[i]/count;
    return myfreq
}