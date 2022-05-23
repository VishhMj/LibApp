const csvToJson = require('csvtojson');
const ObjectsToCsv = require('objects-to-csv');

async function processCSV(path) {
    const data = await csvToJson({
        trim: true,
        delimiter: ";"
    }).fromFile(path);
    return data;
};

async function generateCSV(data, filename) {
        const csv = new ObjectsToCsv(data);

        console.log(__dirname);
       
        // Save to file:
        await csv.toDisk(__dirname + '/../output/'+ filename + '.csv');
       
        // Return the CSV file as string:
        console.log(await csv.toString());
}

module.exports = { 
    processCSV, 
    generateCSV };