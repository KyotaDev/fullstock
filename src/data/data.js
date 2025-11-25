import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getData(callback) {
    const filePath = path.resolve(__dirname, "db.json");
    console.log(filePath);
    fs.readFile(filePath, (err,content) =>{
        if(err) {
            console.error('Error al leer los datos');
            callback(err);
            return;
        }
        try {
            const data = JSON.parse(content);
            callback(null,data);
        } catch (err) {
            console.error('Error al parsear los datos');
            callback(err);
        }
    })
}

export {getData}