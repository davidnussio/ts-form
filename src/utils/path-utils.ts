export function getValueAtPath(data: any, path: string): any {
  const parts = path.split("/");
  let current = data;
  for (const part of parts) {
    if (part === "") continue;
    if (!current) break;
    current = current[part];
  }
  return current;
}

export function setValueAtPath(data: any, path: string, value: any): any {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) {
    return value;
  }
  const newData = { ...data };
  let current = newData;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (typeof current[p] !== "object") {
      current[p] = {};
    }
    current = current[p];
  }
  current[parts[parts.length - 1]] = value;
  return newData;
}
