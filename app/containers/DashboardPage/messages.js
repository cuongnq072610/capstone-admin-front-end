/*
 * DashboardPage Messages
 *
 * This contains all the text for the DashboardPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DashboardPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: `Hi there. Let's get our day started!`,
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: `Of all the hard jobs around, one of the hardest is being a good teacher.`,
  },
  content: {
    id: `${scope}.content`,
    defaultMessage: `A good teacher, like a good entertainer 
    first must hold his audience's attention, 
    then he can teach his lesson.`,
  },
});
