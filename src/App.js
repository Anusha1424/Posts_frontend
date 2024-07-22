import logo from './logo.svg';
import './App.css';
import PostList from './components/Post';

function App() {

  return (
    <div className="App">
      <div>
        <h1>Posts</h1>
        <PostList />
      </div>
    </div>
  );
}

export default App;
