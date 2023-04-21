import * as XLSX from 'xlsx'


export function readFile(){
    var mouthOpens = []
    window.document.getElementById("upload_file").addEventListener("change",function(e){
        if(!e.target.files) return;
        var f = e.target.files[0];
        var reader = new FileReader();
        var content = []

        window.document.getElementById("file_name").innerHTML = '文件名: ' + f.name
        reader.onload = function(e){
            console.log("uploaded")
            var data = e.target.result;
        
            let wb = XLSX.read(data, {type:'binary'});
            var ws = wb.Sheets
            for(var key in ws){
                content  = content.concat(XLSX.utils.sheet_to_json(ws[key]))
                console.log(content[0])
            }
            for(var i in content){
                const mouthOpen = content[i]['SmouthOpen']
                if(mouthOpen != 'NaN'){
                    console.log(content[i]['SmouthOpen'])
                    mouthOpens.push(mouthOpen*1000)
                }
            }
            console.log(mouthOpens)
            
        }
        reader.readAsBinaryString(f)
    })
    
    console.log("xxxx")
    return mouthOpens;
}
