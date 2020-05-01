import moment from 'moment';

const converToLocalTime = (time) => {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

export {
    converToLocalTime,
}