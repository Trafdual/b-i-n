const mongoose=require('mongoose');
var Schema=mongoose.Schema;
var NhanVienSchema=new Schema({
    maNV:{
        type:String,
        require:true
    },
    tenNV:{
        type:String,
        require:true
    },
    diemTB:{
        type:Number
    }
});
module.exports=mongoose.model('NhanVien',NhanVienSchema);