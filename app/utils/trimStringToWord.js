export default (str, charCount) => {
    let trimmedStr = str.substr(0, charCount)
    return trimmedStr.substr(0, Math.min(trimmedStr.length, trimmedStr.lastIndexOf(" ")))
}
