/*
 * NotePage Messages
 *
 * This contains all the text for the NotePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NotePage container!',
  },
  titlePinned: {
    id: `${scope}.titlePinned`,
    defaultMessage: 'Pinned',
  },
  titleOther: {
    id: `${scope}.titleOther`,
    defaultMessage: 'Other',
  },
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Filter',
  },
  sort: {
    id: `${scope}.sort`,
    defaultMessage: 'Sort By',
  },
  folder: {
    id: `${scope}.folder`,
    defaultMessage: 'Folders',
  }
});
