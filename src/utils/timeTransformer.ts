export function timeTransformer(timeToTransform): string {
    const date = new Date(timeToTransform);
    const formatter = new Intl.DateTimeFormat('ru', {
        hour: 'numeric',
        minute: 'numeric',
    });
    return formatter.format(date);
}
