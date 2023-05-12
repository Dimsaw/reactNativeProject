import format from 'date-fns/format';

export function formatPostDate(date) {
    return format(Date.parse(date), 'dd MMMM yyyy, HH:mm:ss'

    );
}