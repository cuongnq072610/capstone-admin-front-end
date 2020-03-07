/*
 * StudentAskPage Messages
 *
 * This contains all the text for the StudentAskPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.StudentAskPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the StudentAskPage container!',
  },
  sortBy : {
    id: `${scope}.sortBy`,
    defaultMessage: 'SORT BY',
  },
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Filter',
  },
  timeAdded : {
    id: `${scope}.timeAdded`,
    defaultMessage: 'Time added',
  },
  display : {
    id: `${scope}.display`,
    defaultMessage: 'DISPLAY',
  },
  answer : {
    id: `${scope}.answer`,
    defaultMessage: 'Answered questions',
  },
  unanswer : {
    id: `${scope}.unanswer`,
    defaultMessage: 'Unanswered questions',
  },
});
