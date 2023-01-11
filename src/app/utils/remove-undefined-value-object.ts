const removeUndefinedValueObject = (value: Record<string, unknown>) => {
  if (typeof value.title === 'object') return value;
  return JSON.parse(JSON.stringify(value));
};

export default removeUndefinedValueObject;
