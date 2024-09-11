export default {
    name: 'SearchData',
    properties: {
        searchValue: 'string',
        times: {
            type: 'int',
            default: 1
        }
    },
    primaryKey: 'searchValue'
}