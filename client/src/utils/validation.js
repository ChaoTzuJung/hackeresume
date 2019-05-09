export const isEmpty = value => 
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) || // 空物件
    (typeof value === 'string' && value.trim().length === 0)
