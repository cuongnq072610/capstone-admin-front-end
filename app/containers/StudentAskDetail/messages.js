/*
 * StudentAskDetail Messages
 *
 * This contains all the text for the StudentAskDetail container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.StudentAskDetail';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the StudentAskDetail container!',
  },
  sideTitle: {
    id: `${scope}.sideTitle`,
    defaultMessage: 'Question',
  },
});
