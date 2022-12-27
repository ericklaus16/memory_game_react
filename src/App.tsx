import { useEffect, useState } from 'react';
import * as C from './App.styles';

import logoImage from './assets/devmemory_logo.png';
import restartIcon from './svgs/restart.svg';

import { Button } from './components/Button';
import { InfoItem } from "./components/InfoItem";
import { GridItem } from './components/GridItem';

import { GridItemType } from './types/GridItemType';
import { items } from './data/items';

import { formatTimeElapsed } from './helpers/formatTimeElapsed';

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => { resetAndCreateGrid(); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing){
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if(shownCount == 2){
      let open = gridItems.filter(item => item.shown);
      if(open.length === 2){
        let tmpGrid = [...gridItems];
        if(open[0].item === open[1].item){
          for(let i in tmpGrid){
            if(tmpGrid[i].shown){
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
        } else {
          setTimeout(() => {          
            for(let i in tmpGrid){
              tmpGrid[i].shown = false;
            }
          }, 1000);
        }

        setGridItems(tmpGrid);
        setShownCount(0);

        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [shownCount, gridItems]);

  useEffect(() => {
    if(moveCount > 0 && gridItems.every(item => item.permanentShown)){
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    let tmpGrid : GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
       tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
       })
    }

    for(let w = 0; w < 2; w++){
      for(let i = 0; i < items.length; i++){
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (items.length * 2)); 
        }        
        tmpGrid[pos].item = i;
      }
    }

    setGridItems(tmpGrid);
    setPlaying(true);
  }

  const handleItemClick = (index : number) => {
    if(playing && index !== null && shownCount < 2 && !hasPlayed){
      let tmpGrid = [...gridItems];

      if(!tmpGrid[index].permanentShown && !tmpGrid[index].shown){
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid);
    } 
    
    if(shownCount == 1 && playing){
      setHasPlayed(true);
      setTimeout(() => {
        setHasPlayed(false);
      }, 1000);
    }
  }

  return(
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt=""/>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Time Counter" value={formatTimeElapsed(timeElapsed)}/>
          <InfoItem label="Movements" value={moveCount.toString()}/>
        </C.InfoArea>

        <Button label="Restart" icon={restartIcon} onClick={resetAndCreateGrid}/>
      </C.Info>
      <C.GridArea>
        <C.Grid>  
          {gridItems.map((item, index) => (
            <GridItem key={index} item={item} onClick={() => handleItemClick(index)}/>
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}

export default App;