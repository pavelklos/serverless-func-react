import Airtable from './Airtable';
import AirtablePhotos from './AirtablePhotos';
import Basic from './Basic';
import GetIP from './GetIP';

function App() {
  return (
    <>
      {/* <h2>React and Serverless Functions</h2> */}
      <Basic />
      <GetIP />
      <Airtable />
      <AirtablePhotos />
    </>
  );
}

export default App;
