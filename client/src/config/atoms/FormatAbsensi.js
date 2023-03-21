const formatAbsensi = (kode) => {
    let kodeNew
    if(kode == "H"){
        kodeNew = "Hadir"
    }else if(kode == "I"){
        kodeNew = "Izin"
    }else if(kode == "S"){
        kodeNew = "Sakit"
    }else if(kode == "A"){
        kodeNew = "Alpa"
    }
    return kodeNew
}
export default formatAbsensi;