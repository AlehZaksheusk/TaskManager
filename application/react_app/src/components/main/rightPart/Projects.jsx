import React from 'react';
import { Button } from 'react-bootstrap';
import ProjectItem from './ProjectItem/ProjectItem';
import CreateProjectModal from '../../../containers/modal/CreateProjectModal';

export default class Projects extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowCreateModal: false,
    };
  }

  toggleModal = () => {
    this.setState({ isShowCreateModal: !this.state.isShowCreateModal });
  };

  render() {
    const projects = this.context.getter.getProjects();

    return (
      <div className="projects-part">
        <Button
          bsStyle="success"
          bsSize="small"
          onClick={() => { this.toggleModal('isShowSignUp'); }}
        >
          Create new project
        </Button>
        <CreateProjectModal
          {...this.props}
          isShowCreateModal={this.state.isShowCreateModal}
          toggleModal={this.toggleModal}
        />
        <div>
          {projects.map((project, index) => {
            return (
              <ProjectItem
                key={`project-info-${index}`}
                project={project}
                {...this.props}
              />);
          })}
        </div>
      </div>
    );
  }
}

Projects.contextTypes = {
  flux: React.PropTypes.object,
  getter: React.PropTypes.object,
};
