/*
 * Highlight Messages
 *
 * This contains all the text for the Highlight container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Highlight';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Highlight container!',
  },
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Filter',
  },
  titlePinned: {
    id: `${scope}.titlePinned`,
    defaultMessage: 'Pinned',
  },
  titleOther: {
    id: `${scope}.titleOther`,
    defaultMessage: 'Other',
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
