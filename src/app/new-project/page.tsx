import CustomForm from '../components/CustomForm';
import NavigationBar from '../components/NavigationBar';

export default function NewProject() {
  return (
    <>
      <nav>
        <NavigationBar />
      </nav>
      <main>
        <CustomForm project={{ titulo: 'pepe', departamento: 'energia', direccion: '123 hola', enCurso: true, convenio: true, mesInicio: 3 }} />
      </main>
    </>
  );
}
