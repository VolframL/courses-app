// export const dateGenerator = (date: string) =>
// 	new Date(date).toLocaleDateString('ua-UK');
// Спочатку я думав що тут у різних локалях дати на беку і фронті, але пізніше
// зрозумів що просто / на . треба замінити
export const dateGenerator = (date: string) => date.replaceAll('/', '.');
