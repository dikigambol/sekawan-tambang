const formatPhone = (e) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
    e.currentTarget.value = e.currentTarget.value.replace(/^0+/, '')
    return null
}
export default formatPhone;