export function renderTimeSince(start: number, end: number): string {
    const durationMs = end - start;
    const durationMinutes = durationMs / 1000 / 60;
    const durationHours = durationMinutes / 60;
    const wholeHours = Math.floor(durationHours);
    const minuteComponent = Math.floor(durationMinutes - (wholeHours * 60));
    return wholeHours.toString().padStart(2, '0') + ':' + minuteComponent.toString().padStart(2, '0')
}
