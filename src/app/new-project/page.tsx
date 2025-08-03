import { Project } from '@/lib/interfaces';
import CustomForm from '../components/CustomForm';
import NavigationBar from '../components/NavigationBar';

export default function NewProject() {
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
        />
      </main>
    </>
  );
}
