import * as XLSX from 'xlsx'

window.document.getElementById("upload_file").addEventListener("change",function(e){
    if(!e.target.files) return;
    var f = e.target.files[0];
    var reader = new FileReader();
    var content = []
    reader.onload = function(e){
        console.log("uploaded")
        var data = e.target.result;
        
        let wb = XLSX.read(data, {type:'binary'});
        var ws = wb.Sheets
        for(var key in ws){
            content  = content.concat(XLSX.utils.sheet_to_json(ws[key]))
            // console.log(content.)
        }
        
        
    }
    reader.readAsBinaryString(f)
})

console.log("xxxx")