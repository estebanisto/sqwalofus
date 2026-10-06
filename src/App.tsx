import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { QuestTrack } from './pages/QuestTrack';
import { Home } from './pages/Home';
import { Secret } from './pages/Secret';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quest-track" element={<QuestTrack />} />
          <Route path="secret" element={<Secret />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
