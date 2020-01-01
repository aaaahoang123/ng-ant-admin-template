export default function enumToKeyValue(data: any) {
  const result = [];
  Object.keys(data).forEach(k => {
    try {
      const key = Number(k);
      if (key || key === 0) {
        result.push({
          key,
          value: data[key]
        });
      }
    } catch (e) {
    }
  });
  return result;
}
