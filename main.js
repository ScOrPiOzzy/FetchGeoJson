var fs = require('fs')
var http = require('https')

fs.mkdirSync('mapdata')
fs.mkdirSync('mapdata/city')
fs.mkdirSync('mapdata/province')

function generateGeoJSON() {
    var p = JSON.parse(fs.readFileSync(`city.json`, 'utf-8'))
    for (const province in p) {
        generateFile(province, 'mapdata/province');
        for (const city in p[province]) {
            generateFile(city, 'mapdata/city');
        }
    }
}

function generateFile(key, dir) {
    http.get(`https://geo.datav.aliyun.com/areas/bound/${key}_full.json`, res => {
        res.on('data', d => fs.writeFileSync(`${dir}/${key}.json`, d, { flag: 'as' }))
        res.on('data', () => console.log('end ...', key))
    });
}

generateFile('100000', 'mapdata');
generateGeoJSON();

console.log('finish');