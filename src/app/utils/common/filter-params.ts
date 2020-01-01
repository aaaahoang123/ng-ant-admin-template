const transform = (val) => {
  switch (true) {
    case (val instanceof Date):
      return val.valueOf();
    case (Array.isArray(val)):
      return val.map(transform).join(',');
    default:
      return val;
  }
};

export default function filterParams(rawParams: any = {}): any {
  return Object.keys(rawParams)
    .filter(key => rawParams[key] || typeof rawParams[key] === 'number')
    .reduce((result, current) => ({ ...result, [current]: transform(rawParams[current]) }), {});
}
