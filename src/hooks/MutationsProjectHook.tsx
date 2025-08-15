'use client';
import { CreateOrUpdateProject } from '@/lib/interfaces';
import { CREATE_PROJECT, UPDATE_PROJECT } from '@/lib/schemas';
import { useMutation } from '@apollo/client';

export default function MutationsProjectHook() {
  const [creatProjectMutation] = useMutation(CREATE_PROJECT);
  const [updateProjectMutation] = useMutation(UPDATE_PROJECT);

  const createProject = async (formData: CreateOrUpdateProject) => {
    await creatProjectMutation({
      variables: {
        createProject: formData,
      },
    });
  };

  const updateProject = async (formData: CreateOrUpdateProject) => {
    await updateProjectMutation({
      variables: {
        updateProject: formData,
      },
    });
  };
  

  return {
    createProject,
    updateProject,
  };
}
