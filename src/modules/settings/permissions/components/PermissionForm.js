import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'modules/common/components';
import Select from 'react-select-plus';
import {
  generateModuleParams,
  generateListParams,
  correctValue,
  filterActions
} from './utils';

const propTypes = {
  save: PropTypes.func,
  modules: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired
};

const contextTypes = {
  closeModal: PropTypes.func.isRequired
};

class PermissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModule: '',
      selectedActions: [],
      selectedUsers: [],
      selectedGroups: []
    };

    this.save = this.save.bind(this);
    this.changeModule = this.changeModule.bind(this);
  }

  save(e) {
    e.preventDefault();

    const {
      selectedModule,
      selectedActions,
      selectedUsers,
      selectedGroups
    } = this.state;

    this.props.save(
      {
        module: selectedModule,
        actions: this.collectValues(selectedActions),
        userIds: this.collectValues(selectedUsers),
        groupIds: this.collectValues(selectedGroups),
        allowed: document.getElementById('allowed').checked
      },
      () => {
        this.context.closeModal();
      }
    );
  }

  changeModule(item) {
    const val = correctValue(item);

    this.setState({
      selectedModule: val,
      selectedActions: []
    });
  }

  collectValues(items) {
    return items.map(item => item.value);
  }

  renderContent() {
    const { modules, actions, users, groups } = this.props;
    const {
      selectedModule,
      selectedActions,
      selectedUsers,
      selectedGroups
    } = this.state;

    return (
      <div>
        <FormGroup>
          <ControlLabel>Choose the module</ControlLabel>
          <br />

          <Select
            placeholder="Choose module"
            options={generateModuleParams(modules)}
            value={selectedModule}
            onChange={items => {
              this.changeModule(items);
            }}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Choose the actions</ControlLabel>
          <br />

          <Select
            placeholder="Choose actions"
            options={filterActions(actions, selectedModule)}
            value={selectedActions}
            onChange={items => {
              this.setState({ selectedActions: items });
            }}
            multi
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Choose the groups</ControlLabel>
          <br />

          <Select
            placeholder="Choose groups"
            options={generateListParams(groups)}
            value={selectedGroups}
            onChange={items => {
              this.setState({ selectedGroups: items });
            }}
            multi
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Choose the users</ControlLabel>
          <br />

          <Select
            placeholder="Choose users"
            options={generateListParams(users)}
            value={selectedUsers}
            onChange={items => {
              this.setState({ selectedUsers: items });
            }}
            multi
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Allow</ControlLabel>
          <FormControl
            componentClass="checkbox"
            defaultChecked={false}
            id="allowed"
          />
        </FormGroup>
      </div>
    );
  }

  render() {
    const onClick = () => {
      this.context.closeModal();
    };

    return (
      <form onSubmit={this.save}>
        {this.renderContent()}
        <Modal.Footer>
          <Button
            btnStyle="simple"
            type="button"
            onClick={onClick}
            icon="close"
          >
            Cancel
          </Button>

          <Button btnStyle="success" type="submit" icon="checkmark">
            Save
          </Button>
        </Modal.Footer>
      </form>
    );
  }
}

PermissionForm.propTypes = propTypes;
PermissionForm.contextTypes = contextTypes;

export default PermissionForm;
