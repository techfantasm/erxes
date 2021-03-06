import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from 'modules/layout/components';
import { Row, RowTitle, Box, Divider, BoxName } from '../styles';

class Settings extends Component {
  renderBox(name, image, to) {
    return (
      <Box>
        <Link to={to}>
          <img src={image} alt={name} />
          <BoxName>{name}</BoxName>
        </Link>
      </Box>
    );
  }

  render() {
    const breadcrumb = [{ title: 'Settings', link: '/settings' }];

    const content = (
      <div>
        <Row>
          <RowTitle>Account Settings</RowTitle>
          <div>
            {this.renderBox(
              'Channels',
              '/images/icons/erxes-05.svg',
              '/settings/channels'
            )}
            {this.renderBox(
              'Brands',
              '/images/icons/erxes-03.svg',
              '/settings/brands'
            )}
            {this.renderBox(
              'Integrations',
              '/images/icons/erxes-04.svg',
              '/settings/integrations'
            )}
            {this.renderBox(
              'Response Template',
              '/images/icons/erxes-10.svg',
              '/settings/response-templates'
            )}
            {this.renderBox(
              'Email Template',
              '/images/icons/erxes-09.svg',
              '/settings/email-templates'
            )}
            {this.renderBox(
              'Email Appearance',
              '/images/icons/erxes-08.svg',
              '/settings/emails'
            )}
            {this.renderBox(
              'Forms',
              '/images/icons/erxes-12.svg',
              '/settings/forms'
            )}
            {this.renderBox(
              'Team Members',
              '/images/icons/erxes-02.svg',
              '/settings/team'
            )}
          </div>
        </Row>
        <Divider />
        <Row>
          <RowTitle className="secondRow">Personal Settings</RowTitle>
          <div>
            {this.renderBox(
              'Profile',
              '/images/icons/erxes-01.svg',
              '/settings/profile'
            )}
            {this.renderBox(
              'Change password',
              '/images/icons/erxes-13.svg',
              '/settings/change-password'
            )}
            {this.renderBox(
              'Email Signature',
              '/images/icons/erxes-07.svg',
              '/settings/emails/signatures'
            )}
            {this.renderBox(
              'Notification',
              '/images/icons/erxes-11.svg',
              '/settings/notification-settings'
            )}
          </div>
        </Row>
      </div>
    );

    return (
      <Wrapper
        header={<Wrapper.Header breadcrumb={breadcrumb} />}
        content={content}
        transparent={true}
      />
    );
  }
}

export default Settings;
