/**
 * Remove null value in object
 */
const removeUndefinedValueObject = (value: Record<string, unknown>) => JSON.parse(JSON.stringify(value));

export default removeUndefinedValueObject;
