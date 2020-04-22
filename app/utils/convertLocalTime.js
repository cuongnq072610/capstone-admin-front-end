import moment from 'moment';

const converToLocalTime = (time) => {
    return moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss');
}

export {
    converToLocalTime,
}