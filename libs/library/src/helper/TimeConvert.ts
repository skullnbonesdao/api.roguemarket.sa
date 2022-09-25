export function timeConvert(time_text: string): number {

    const units: any = {
        'M': 18144000,
        'W': 604800,
        'w': 604800,
        'D': 86400,
        'd': 86400,
        'H': 3600,
        'h': 3600,
        'S': 1,
        's': 1,
    };
    const regex = /(\d+)([MWwDdHhSs])/g;

    let seconds = 0;
    let match;
    while ((match = regex.exec(time_text))) {
        seconds += parseInt(match[1]) * units[match[2]];
    }

    if (seconds === 0)
        seconds = parseInt(time_text) * 60

    return seconds;
}
