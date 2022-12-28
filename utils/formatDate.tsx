import format from 'date-fns/format';

const normal = (date) => date && formatDate(date, 'yyyy-MM-dd');
const formatDate = (date, formatType) => format(date instanceof Date ? date : new Date(date.includes('Z') ? date : date.replace(/-/g, "/")), formatType)
export default { normal };
