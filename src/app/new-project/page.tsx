'use client'
import { CreateOrUpdateProject, Project } from '@/lib/interfaces';
import CustomForm from '../components/CustomForm';
import NavigationBar from '../components/NavigationBar';

export default function NewProject() {
  const handleFormData = (formData: CreateOrUpdateProject) => {
    console.log(formData);
  }
  return (
    <>
      <nav>
        <NavigationBar />
      </nav>
      <main>
        <CustomForm
          project={{} as Project}
          areas={[]}
          personal={[]}
          handleFormData={handleFormData}
        />
      </main>
    </>
  );
}
