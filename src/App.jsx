import Router from './Router';
import './App.css'
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';

function App() {
  return (
    <Router>
      {({ route }) => {
        const photoIdMatch = route.match(/^\/photos\/(\d+)$/);
        
        if (photoIdMatch) {
          const photoId = photoIdMatch[1];
          return (
            <PhotoDetail
              photoId={photoId}
              onBack={() => {
                window.location.hash = '/photos';
              }}
            />
          );
        }
        
        return (
          <PhotoList
            onPhotoClick={(id) => {
              window.location.hash = `/photos/${id}`;
            }}
          />
        );
      }}
    </Router>
  )
}

export default App
