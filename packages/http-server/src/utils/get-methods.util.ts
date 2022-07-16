export function getMethods(prototype: Record<string, any>) {
    return Object.getOwnPropertyNames(prototype).filter(
        (prop) => prop !== "constructor" && typeof prototype[prop] === "function",
    );
}
