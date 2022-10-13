const publish = (data) => {
    const now = new Date().getTime()
    data.getTime()
    let newdata = now - data
    newdata = Math.floor(newdata / 60000)
    if (newdata > 60){
        let hour = Math.floor(newdata / 60)
        return `${hour} hours ago`
    }
    if (newdata < 60) {
        return `${newdata} munites ago`     
    }
}

module.exports = {
    publish
}