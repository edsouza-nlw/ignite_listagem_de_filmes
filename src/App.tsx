import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Header } from './components/Header';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        selectedGenreId={selectedGenre.id}
        handleClickButton={handleClickButton}
      />

      <div className="container">
        <Header title={selectedGenre.title} />
        <Content selectedGenreId={selectedGenreId} />
      </div>
    </div>
  );
}