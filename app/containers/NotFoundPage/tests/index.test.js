/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import H2 from 'components/H2';

import NotFound from '../index';
import notFoundLogo from './assets/noteIt-404.png';
import noteItCyan from './assets/noteIt-cyan.png';
import { Button } from 'antd';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = shallow(<NotFound />);
    expect(
      renderedComponent.contains(
        <div className='not-found-page'>
          <div className='not-found-wrapper'>
            <img src={notFoundLogo} className='not-found-logo' />
            <H1 className='warning' style={{ fontWeight: '900' }}>
              <FormattedMessage
                id="boilerplate.containers.NotFoundPage.head"
                defaultMessage="404 - Rrrrrr this is Dino`s note!"
              />
            </H1>
            <H2 className='warning'>
              <FormattedMessage
                id="boilerplate.containers.NotFoundPage.body"
                defaultMessage="We could not find what you want to look for, sorry for not noting it."
              />
            </H2>
            <Button className='box-warning'>
              <img src={noteItCyan} className='note-logo' />
              <p className='box-p'>
                <FormattedMessage
                  id="boilerplate.containers.NotFoundPage.footer"
                  defaultMessage="Head back to us now!" />
              </p>
            </Button>
          </div>
        </div>,
      ),
    ).toEqual(false);
  });
});
