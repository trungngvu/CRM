const filterByKeyword = (value: string, keyword: string) =>
  value.toLowerCase().replace(/\s+/g, '').includes(keyword.toLowerCase().replace(/\s+/g, ''));

export default filterByKeyword;
