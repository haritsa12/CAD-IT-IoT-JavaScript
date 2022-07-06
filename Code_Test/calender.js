const jsonData= require('./schedule_2.json')
var array_ts = []
var array_te = []

var overlap = false
// ubah waktu menjadi epoch untuk mengmabil nilai time start dan time end
function epoch (date) {
    return Date.parse(date)
  }
jsonData.forEach(obj => {
    Object.entries(obj).forEach(([key, value]) => {
        if (key == 'start'){
            const timestamp = epoch(value)
            array_ts.push(timestamp)
        }
        if (key == 'end'){
            const timestamp = epoch(value)
            array_te.push(timestamp)
        }
    });
});
for (let i = 0; i < array_ts.length; i++) {
    jsonData[i].overlap=[i+1]
}

// Function Cek skenario-skenario overlap
function overlap_bool (i,k,ts1, ts2, te1, te2){
    if (ts1 == ts2 || te1 == te2){
        overlap = true
    }
    
    else if (ts1 > ts2 && te1 > te2){
        if (ts1 > te2){
            overlap = true
        }
        else{
            overlap = false
        }
    }
    else if (ts1 < ts2 && te1 < te2){
        if (te1 > ts2){
            overlap = true
        }
        else{
            overlap = false
        }
    }
    else if (ts1 < ts2 && te1 > te2){
        overlap = true
    }
    else if (ts1 > ts2 && te1 < te2){
        overlap = true
    }
    else{
        overlap = false
    }
    return overlap
}

for (let i = 0; i < array_ts.length; i++) {
    for (let k = i + 1; k < array_ts.length; k++) {

        overlap_bool(i+1,k+1,array_ts[i], array_ts[k], array_te[i], array_te[k])
        if (overlap == true){
            jsonData[i].overlap.push(k+1)
            jsonData[k].overlap.push(i+1)
        }
        jsonData[i].overlap.sort()
        jsonData[k].overlap.sort()      

    }
}

console.log(jsonData)

const fs = require('fs');
const data = JSON.stringify(jsonData);
fs.writeFile('package.json', data, (err) => {
    if (err) {
        throw err
    }
})
