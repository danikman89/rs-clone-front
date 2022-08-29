import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { Box, styled } from '@mui/material';

import { NavMenu } from './NavMenu/NavMenu';
import { Sidebar } from './SIdebar/Sidebar';
import { Centerblock } from './Centerblock/Centerblock';
import { Player } from '../../components/Player/Player';
import { text } from '../../constants';
import { useAppSelector } from '../../hook';
import { SongType } from '../../types';
import { fetchTracks } from '../../fetchers/fetchTracks';

const cnMain = cn('Main');

export type MainProps = {
  header: string;
};

const Wrapper = styled(Box)`
  max-width: 100%;
`;

export const Main: FC<MainProps> = ({ header }) => {
  const [tracks, setTracks] = useState<SongType[]>();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const lang = useAppSelector((state) => state.language.lang);
  const bgColor = useAppSelector((state) => state.colorTheme.bgColor);

  useEffect(() => {
    fetchTracks().then((data) => {
      setTracks(data);
    });
  }, []);

  return (
    <Wrapper style={{ backgroundColor: bgColor }}>
      <Box
        sx={{
          display: 'flex',
          maxWidth: '1920px',
          minHeight: '100vh',
          margin: '0 auto',
        }}
        className={cnMain()}
      >
        <NavMenu />
        <Centerblock
          tracks={tracks as SongType[]}
          header={header}
        ></Centerblock>
        <Sidebar
          isVisible={header === text.header.tracks[lang]}
          isUserVisible={header !== text.menu.profile[lang]}
        ></Sidebar>
      </Box>
      <Player track={currentTrack}></Player>
    </Wrapper>
  );
};
