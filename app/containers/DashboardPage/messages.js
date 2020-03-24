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
    defaultMessage: `Be a wise teacher! And open your fucking mind up!`,
  },
  content: {
    id: `${scope}.content`,
    defaultMessage: `Listen to your students, they know more than an old
    creep shit bastard self-titled like you. You know nothing
    about UX at all, stop giving them stupid advices.`,
  },
});
