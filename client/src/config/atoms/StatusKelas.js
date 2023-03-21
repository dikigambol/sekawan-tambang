function StatusKelas(val) {
    if (val == 0) return 'd-learning'
    else if (val == 1) return 'e-learning'
    else if (val == 2) return 'offline'
    else return '-'
}

export default StatusKelas;