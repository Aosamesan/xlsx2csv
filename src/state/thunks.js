import XLSX from 'xlsx';
import { loadFile } from './action';

async function readFileAsync(file) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            let f = XLSX.read(data, {
                type: 'array'
            });
            resolve(f);
        };
        reader.onerror = function (e) {
            reject('Cannot Open File');
        };
        reader.readAsArrayBuffer(file);
    });
}


export function readFile(file) {
    return async function (dispatch, getState) {
        let xlsx = await readFileAsync(file).catch(err => console.log(err));
        dispatch(loadFile(xlsx));
    };
}