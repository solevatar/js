s = process.argv[2];
alph = new Array();
for(i = 0; i < s.length; i++){
    if (s.charAt(i) in alph){
        alph[s.charAt(i)]++;
    }
    else{
        alph[s.charAt(i)] = 1;
    }
}
n = 0;
for(i in alph){
    alph[i] /= s.length;
    n ++;
}
h = 0;
for(i in alph){
    h -= alph[i] * Math.log(alph[i]);
}
h /= Math.log(n);
if (h > 0){
    console.log(h);
}
else{
    console.log(0);
}