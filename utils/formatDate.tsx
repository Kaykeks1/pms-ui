import format from 'date-fns/format';

const normal = (date) => date && formatDate(date, 'yyyy-MM-dd');
const normal2 = (date) => date && formatDate(date, 'dd/MM/yyyy');
const normal3 = (date) => date && formatDate(date, 'dd MMM yyyy');
const formatDate = (date, formatType) => format(date instanceof Date ? date : new Date(date.includes('Z') ? date : date.replace(/-/g, "/")), formatType)
export default { normal, normal2, normal3 };
