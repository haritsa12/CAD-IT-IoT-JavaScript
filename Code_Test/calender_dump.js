const jsonData= require('./schedule_2.json')
console.log(jsonData)
var array_ts = []
var array_te = []
var array_comp=[]
var overlap_pair = []
var overlap = false
jsonData.forEach(obj => {
    Object.entries(obj).forEach(([key, value]) => {
        if (key == 'start'){
            const timestamp = epoch(value)
            array_ts.push(timestamp)
            console.log(value)
            console.log(array_ts)
            // console.log(timestamp) 

        }
        if (key == 'end'){
            const timestamp = epoch(value)
            array_te.push(timestamp)
            console.log(array_te)
            // console.log(value)
            // console.log(timestamp) 

        }
        // console.log(key + ' ' + value);
    });
    console.log('-------------------');
});
for (let i = 0; i < array_ts.length; i++) {
    jsonData[i].overlap=[i+1]
}
arr_of_overlap_1 = []
arr_of_overlap_2 = []
batas_ts = 0
batas_te = 0

cluster_overlap = []

for (let i = 0; i < array_ts.length; i++) {
    for (let k = i + 1; k < array_ts.length; k++) {
        // array_comp_val = [i, k, array_ts[i]-array_ts[k]]
        // array_comp.push(array_comp_val)
        // console.log(i,k,array_ts[i]-array_ts[k])
        // console.log(array_comp)
        // console.log(i+1,k+1)
        overlap_bool(i+1,k+1,array_ts[i], array_ts[k], array_te[i], array_te[k])
        console.log(i+1)
        if (overlap == true){
            jsonData[i].overlap.push(k+1)
            jsonData[k].overlap.push(i+1)
            arr_of_overlap_1.push([i+1,k+1])
            arr_of_overlap_2.push([k+1,i+1])
            console.log('tes 1',arr_of_overlap_1)
            console.log('tes 2',arr_of_overlap_2)
            console.log(jsonData[i].overlap)
            
            overlap_pair.push([k+1])
            // console.log(overlap_pair)
        }
        jsonData[i].overlap.sort()
        jsonData[k].overlap.sort()
        

    }
    for (let j = 0; j < jsonData[i].overlap.length; j++) {
        batas_ts = array_ts[jsonData[i].overlap[j]]
        batas_te = array_te[jsonData[i].overlap[j]]
        // console.log('tes masuk loop j',j)
        // console.log(batas_ts)
        // console.log(batas_te)
        for (let m = j+1; m < jsonData[i].overlap.length; m++) {
            // console.log('tes masuk loop m',m)
            // console.log('ts dalam overlap',array_ts[jsonData[i].overlap[m]])
            // console.log('batas ts nya: ',batas_ts)
            console.log('cek i dan j dan m ', i+1,j+1,m+1)
            console.log(jsonData[i].overlap[m])
            console.log(array_ts[jsonData[i].overlap[m]])
            console.log(batas_ts)
            console.log(batas_te)
            if (array_ts[jsonData[i].overlap[m]] >= batas_ts && array_ts[jsonData[i].overlap[m]] <= batas_te){
                // console.log('tes masuk if',m)
                
                cluster_overlap.push(m+1)
                batas_ts = array_ts[jsonData[i].overlap[m]]
                batas_te = array_te[jsonData[i].overlap[m]]
                console.log('clusternya: ',cluster_overlap)
            }
        }

    }
}


// for (let i = 0; i < array_ts.length; i++) {
//     console.logjsonData[i].overlap.sort
// }

console.log(jsonData)

const fs = require('fs');
const data = JSON.stringify(jsonData);
fs.writeFile('user.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});

function epoch (date) {
  return Date.parse(date)
}

function overlap_bool (i,k,ts1, ts2, te1, te2){
    if (ts1 == ts2 || te1 == te2){
        // console.log('kondisi 1',i,k,ts1, ts2, te1, te2)
        overlap = true
    }
    
    else if (ts1 > ts2 && te1 > te2){
        if (ts1 > te2){
            // console.log('kondisi 2',i,k,ts1, ts2, te1, te2)
            overlap = true
            // console.log('overlap adalah:',overlap)
        }
        else{
            overlap = false
            // console.log('aman ',i,k,overlap)
        }
    }
    else if (ts1 < ts2 && te1 < te2){
        if (te1 > ts2){
            // console.log('kondisi 3',i,k,ts1, ts2, te1, te2)
            overlap = true
            // console.log('overlap adalah:',overlap)
        }
        else{
            overlap = false
            // console.log('aman ',i,k,overlap)
        }
    }
    else if (ts1 < ts2 && te1 > te2){
        // console.log('kondisi 4',i,k,ts1, ts2, te1, te2)
        overlap = true
        // console.log('overlap adalah:',overlap)
    }
    else if (ts1 > ts2 && te1 < te2){
        // console.log('kondisi 5',i,k,ts1, ts2, te1, te2)
        overlap = true
        // console.log('overlap adalah:',overlap)
    }
    else{
        overlap = false
        // console.log('aman ',i,k,overlap)
    }
    // console.log(overlap)
    return overlap

}

// const dateToday = new Date() // Mon Jun 08 2020 16:47:55 GMT+0800 (China Standard Time)
// const timestamp = epoch(dateToday)

// console.log(timestamp) 