export function isPrimitive(value: unknown) {
    return (typeof value !== "object" && typeof value !== "function") || value === null;
}
