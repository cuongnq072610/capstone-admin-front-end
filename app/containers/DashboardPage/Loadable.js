/**
 *
 * Asynchronously loads the component for DashboardPage
 *
 */

import loadable from 'loadable-components';
export default loadable(() => import('./index'));

// import React from 'react';
// import DashboardPage from './index';
// import WrapperLayout from '../../components/WrapperLayout';

// const DashboardPageLoadable = () => {
//     return (
//         < WrapperLayout component={DashboardPage}/>
//     )
// }

// export default DashboardPageLoadable 