export function objectToQueryString(obj: Record<string, any>): string {
  const key_value_pairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined) {
        key_value_pairs.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }
  }

  return key_value_pairs.join("&");
}
