export function formatPhoneNumber(number: string | number): string {
    if (typeof number === 'number') {
        number = number.toString();
    }
    const areaCode = number.slice(0, 3);
    const firstPart = number.slice(3, 6);
    const secondPart = number.slice(6, 10);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
}