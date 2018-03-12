import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { uploadHandler } from 'modules/common/utils';
import { FormControl, Icon } from 'modules/common/components';
import { dimensions, colors } from 'modules/common/styles';
import { EmbeddedPreview, PopupPreview, ShoutboxPreview } from './preview';
import {
  FlexItem,
  LeftItem,
  Preview,
  Title,
  ColorPick,
  ColorPicker,
  Picker,
  BackgroundSelector
} from './style';

const ImageWrapper = styled.div`
  border: 1px dashed ${colors.borderDarker};
  border-radius: 5px;
  position: relative;
  background: ${colors.colorLightBlue};
`;

const ImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${dimensions.coreSpacing}px;
  min-height: 200px;

  img {
    max-width: 300px;
  }

  i {
    visibility: hidden;
    cursor: pointer;
    position: absolute;
    right: 150px;
    top: 30px;
    width: 30px;
    height: 30px;
    display: block;
    border-radius: 30px;
    text-align: center;
    line-height: 30px;
    background: rgba(255, 255, 255, 0.5);
    transition: all ease 0.3s;
  }

  &:hover {
    i {
      visibility: visible;
    }
  }
`;

const propTypes = {
  integration: PropTypes.object,
  kind: PropTypes.string
};

class CallOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Contact',
      bodyValue: 'Body description here',
      btnText: 'Send',
      color: '#04A9F5',
      theme: '#04A9F5',
      logo: '',
      logoPreviewStyle: {},
      logoPreviewUrl: ''
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.onChangeBtn = this.onChangeBtn.bind(this);
    this.onThemeChange = this.onThemeChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  onColorChange(e) {
    this.setState({ color: e.hex });
  }

  onChangeText(event) {
    this.setState({ title: event.target.value });
  }

  onChangeBody(event) {
    this.setState({ bodyValue: event.target.value });
  }

  onThemeChange(value) {
    this.setState({ theme: value });
  }

  onChangeBtn(event) {
    this.setState({ btnText: event.target.value });
  }

  removeImage() {
    this.setState({ logoPreviewUrl: '' });
  }

  handleImage(e) {
    const imageFile = e.target.files[0];

    uploadHandler({
      file: imageFile,

      beforeUpload: () => {
        this.setState({ logoPreviewStyle: { opacity: '0.9' } });
      },

      afterUpload: ({ response }) => {
        this.setState({
          logo: response,
          logoPreviewStyle: { opacity: '1' }
        });
      },

      afterRead: ({ result }) => {
        this.setState({ logoPreviewUrl: result });
      }
    });
  }

  renderPreview() {
    const { kind } = this.props;
    const {
      title,
      bodyValue,
      btnText,
      color,
      theme,
      logoPreviewUrl
    } = this.state;

    if (kind === 'shoutbox') {
      return (
        <ShoutboxPreview
          title={title}
          bodyValue={bodyValue}
          btnText={btnText}
          color={color}
          theme={theme}
          image={logoPreviewUrl}
        />
      );
    } else if (kind === 'popup') {
      return (
        <PopupPreview
          title={title}
          bodyValue={bodyValue}
          btnText={btnText}
          color={color}
          theme={theme}
          image={logoPreviewUrl}
        />
      );
    }
    return (
      <EmbeddedPreview
        title={title}
        bodyValue={bodyValue}
        btnText={btnText}
        color={color}
        theme={theme}
        image={logoPreviewUrl}
      />
    );
  }

  renderThemeColor(value) {
    return (
      <BackgroundSelector
        selected={this.state.theme === value}
        onClick={() => this.onThemeChange(value)}
      >
        <div style={{ backgroundColor: value }} />
      </BackgroundSelector>
    );
  }

  renderUploadImage() {
    const { logoPreviewUrl } = this.state;

    return logoPreviewUrl ? (
      <div>
        <img src={logoPreviewUrl} alt="previewImage" />
        <Icon icon="close" size={15} onClick={this.removeImage} />
      </div>
    ) : (
      <input type="file" onChange={this.handleImage} />
    );
  }

  render() {
    const { __ } = this.context;

    const popoverTop = (
      <Popover id="color-picker">
        <ChromePicker color={this.state.color} onChange={this.onColorChange} />
      </Popover>
    );

    return (
      <FlexItem>
        <LeftItem>
          <Title>{__('Callout title')}</Title>
          <FormControl
            id="callout-title"
            type="text"
            value={this.state.title}
            onChange={this.onChangeText}
          />

          <Title>{__('Callout body')}</Title>
          <FormControl
            id="callout-body"
            type="text"
            value={this.state.bodyValue}
            onChange={this.onChangeBody}
          />

          <Title>{__('Callout button text')}</Title>
          <FormControl
            id="callout-btn-text"
            value={this.state.btnText}
            onChange={this.onChangeBtn}
          />

          <Title>{__('Theme color')}</Title>
          <p>{__('Try some of these colors:')}</p>

          <ColorPick>
            {this.renderThemeColor('#04A9F5')}
            {this.renderThemeColor('#392a6f')}
            {this.renderThemeColor('#fd3259')}
            {this.renderThemeColor('#67C682')}
            {this.renderThemeColor('#F5C22B')}
            {this.renderThemeColor('#888')}
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="bottom"
              overlay={popoverTop}
            >
              <ColorPicker>
                <Picker style={{ backgroundColor: this.state.color }} />
              </ColorPicker>
            </OverlayTrigger>
          </ColorPick>

          <Title>{__('Featured image')}</Title>
          <ImageWrapper>
            <ImageContent>{this.renderUploadImage()}</ImageContent>
          </ImageWrapper>
        </LeftItem>
        <Preview>{this.renderPreview()}</Preview>
      </FlexItem>
    );
  }
}

CallOut.propTypes = propTypes;
CallOut.contextTypes = {
  __: PropTypes.func
};

export default CallOut;