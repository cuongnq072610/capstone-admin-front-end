/**
 *
 * Asynchronously loads the component for Highlight
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
