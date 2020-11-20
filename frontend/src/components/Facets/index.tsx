import React from 'react';
import { useAsync } from 'react-async';
import { fetchProjects } from '../../api';
import { objectIsEmpty } from '../../common/utils';
import Divider from '../General/Divider';
import { NodeStatusArray } from '../NodeStatus/types';
import { ActiveSearchQuery } from '../Search/types';
import FacetsForm from './FacetsForm';
import ProjectForm from './ProjectForm';
import { ActiveFacets, DefaultFacets, ParsedFacets, RawProject } from './types';

const styles = {
  form: {
    width: '100%',
  },
};

export type Props = {
  activeSearchQuery: ActiveSearchQuery;
  defaultFacets: DefaultFacets;
  availableFacets: ParsedFacets | Record<string, unknown>;
  nodeStatus?: NodeStatusArray;
  onProjectChange: (selectedProj: RawProject) => void;
  onSetFacets: (defaults: DefaultFacets, active: ActiveFacets) => void;
};

const Facets: React.FC<Props> = ({
  activeSearchQuery,
  defaultFacets,
  availableFacets,
  nodeStatus,
  onProjectChange,
  onSetFacets,
}) => {
  const { data, error, isLoading } = useAsync(fetchProjects);

  const handleSubmitProjectForm = (selectedProject: {
    [key: string]: string;
  }): void => {
    /* istanbul ignore else */
    if (data) {
      const selectedProj: RawProject | undefined = data.results.find(
        (obj: RawProject) => obj.name === selectedProject.project
      );
      /* istanbul ignore else */
      if (selectedProj) {
        onProjectChange(selectedProj);
      }
    }
  };

  /**
   * TODO: Add logic to handle new resultType form for replicas
   */
  const handleUpdateFacetsForm = (selectedFacets: {
    [key: string]: string[] | [];
  }): void => {
    const newActive = selectedFacets;

    // TODO: Placeholder until DefaultFacets are removed
    const newDefaults: DefaultFacets = { latest: true, replica: false };

    // The form keeps a history of all selected facets, including when a
    // previously selected key goes from > 0 elements to 0 elements. Thus,
    // iterate through the object and delete the keys where the array's length
    // is equal to 0.
    Object.keys(newActive).forEach((key) => {
      if (newActive[key] === undefined || newActive[key].length === 0) {
        delete newActive[key];
      }
    });
    onSetFacets(newDefaults, newActive);
  };

  return (
    <div data-testid="facets" style={styles.form}>
      <h2>Select a Project</h2>
      <div data-testid="projectForm">
        <ProjectForm
          activeSearchQuery={activeSearchQuery}
          projectsFetched={data}
          projectsIsLoading={isLoading}
          projectsError={error}
          onFinish={handleSubmitProjectForm}
        />
        <Divider />
      </div>
      {!objectIsEmpty(availableFacets) && (
        <>
          <h2>Filter with Facets</h2>
          <FacetsForm
            activeSearchQuery={activeSearchQuery}
            defaultFacets={defaultFacets}
            availableFacets={availableFacets as ParsedFacets}
            nodeStatus={nodeStatus}
            onValuesChange={handleUpdateFacetsForm}
          />
        </>
      )}
    </div>
  );
};

export default Facets;
