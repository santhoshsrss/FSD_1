const fs = require('fs');
const quote1 = 'If you can dream it, you can achieve it.' 

fs.writeFile('./fun.html',quote1, (err) => {
    console.log('complete writing')
})

const quote2 = 'All our dreams can come true, if we have the courage to pursue them.'


const [, , noOfFiles] = process.argv;

genFile(noOfFiles);

function genFile(noOfFiles) {

if (noOfFiles > 50){
    console.log('Maximum Limit exceeded');
    return;
}

for(let i = 1; i <= noOfFiles; i++){

    fs.writeFile(`./backup/text-${i}.html`,quote2, (err) => {  
        console.log('complete writing...') 
    })
    }
}

fs.readFile('./santhosh.txt', 'utf-8' , (err, data) => {
    if(err){
        console.log('Error Please Try Again',err);
    }else{
       console.log(data); 
    }
    
})

const quote3 = 'The secret of getting ahead is getting started.';

fs.appendFile('./fun.html','\n' + quote3, (err) => {
    console.log('complete Updating')
})

fs.unlink('./delete_me.css', (err) => {
    console.log('complete deleting')
})


