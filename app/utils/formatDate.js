export default date => {
    let d = new Date(date)
    let month = d.getUTCMonth()
    let day = d.getUTCDate()
    let year = d.getUTCFullYear()
    // We want the format of YYYY MMM DD (ex: 2020 Jan 01)
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    return `${year} ${months[month]} ${day}`
}
