export function classNames(...classList: (string | undefined | false)[]): { className: string } {
    return {
        className: classList.filter(c => !!c).join(' ')
    }
}
