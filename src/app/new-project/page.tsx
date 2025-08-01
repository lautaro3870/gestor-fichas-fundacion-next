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
          project={{}}
          areas={[]}
        />
      </main>
    </>
  );
}
