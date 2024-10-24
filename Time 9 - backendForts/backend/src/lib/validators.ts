export function isNameValid(name: String) {
    return name.length > 5 && name.endsWith("!") && name.includes(" ")
}