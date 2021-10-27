const tables = [
    'User'
]

function isTableAvailable(tableName) {
    return tables.includes(tableName);
}

module.exports = { isTableAvailable }