/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.NotFoundPage';

export default defineMessages({
  head: {
    id: `${scope}.head`,
    defaultMessage: '404 - Rrrrrr this is Dino`s note!',
  },
  body: {
    id: `${scope}.body`,
    defaultMessage: 'We could not find what you want to look for, sorry for not noting it.',
  },
  footer: {
    id: `${scope}.footer`,
    defaultMessage: 'Head back to us now!',
  },
});
