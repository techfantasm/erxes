import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import {
  FormGroup,
  ControlLabel,
  FormControl
} from 'modules/common/components';
import { FormWrapper, EditorWrapper, FormHeader } from '../styles';

import {
  EMAIL_CONTENT_PLACEHOLDER,
  EMAIL_CONTENT_CLASS
} from 'modules/engage/constants';

import Editor from './Editor';

const propTypes = {
  message: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  onContentChange: PropTypes.func.isRequired
};

class EmailForm extends Component {
  constructor(props) {
    super(props);

    const message = props.message || {};
    const email = message.email || {};

    // current template
    let currentTemplate = EMAIL_CONTENT_PLACEHOLDER;

    if (email.templateId) {
      currentTemplate = this.findTemplate(email.templateId);
    }

    // states
    this.state = { currentTemplate };

    // binds
    this.onContentChange = this.onContentChange.bind(this);
    this.onTemplateChange = this.onTemplateChange.bind(this);
  }

  onTemplateChange(e) {
    this.setState({ currentTemplate: this.findTemplate(e.target.value) });
  }

  componentDidMount() {
    this.renderBuilder();
  }

  componentDidUpdate(prevProps, prevState) {
    // only after current template change
    if (this.state.currentTemplate !== prevState.currentTemplate) {
      this.renderBuilder();
    }
  }

  findTemplate(id) {
    const template = this.props.templates.find(t => t._id === id);

    if (template) {
      return template.content;
    }

    return '';
  }

  renderBuilder() {
    const contentContainer = document.getElementsByClassName(
      EMAIL_CONTENT_CLASS
    );
    const { message } = this.props;
    const email = message.email || {};

    // render editor to content
    if (contentContainer.length > 0) {
      ReactDom.render(
        <Editor defaultValue={email.content} onChange={this.onContentChange} />,
        contentContainer[0]
      );
    }
  }

  onContentChange(content) {
    this.props.onContentChange(content);
  }

  renderHeader() {
    const { message, templates } = this.props;
    const email = message.email || {};

    return (
      <FormHeader>
        <FormGroup>
          <ControlLabel>Email subject:</ControlLabel>
          <FormControl
            id="emailSubject"
            defaultValue={email.subject}
            required
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Email template:</ControlLabel>
          <FormControl
            id="emailTemplateId"
            componentClass="select"
            onChange={this.onTemplateChange}
            defaultValue={email.templateId}
          >
            <option />
            {templates.map(t => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </FormControl>
        </FormGroup>
      </FormHeader>
    );
  }

  render() {
    return (
      <FormWrapper>
        {this.renderHeader()}

        <ControlLabel>Message:</ControlLabel>
        <EditorWrapper>
          <div
            dangerouslySetInnerHTML={{ __html: this.state.currentTemplate }}
          />
        </EditorWrapper>
      </FormWrapper>
    );
  }
}

EmailForm.propTypes = propTypes;

export default EmailForm;
