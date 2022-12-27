import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';
import b7svg from "../../svgs/b7.svg";
import { items } from '../../data/items';

type Props = {
    item: GridItemType;
    onClick: () => void;
}

export const GridItem = (props: Props) => {
    return (
        <C.Container showBackground={props.item.permanentShown || props.item.shown} onClick={props.onClick}>
            {!props.item.permanentShown && !props.item.shown &&
                <C.Icon src={b7svg} alt="" opacity={.1}/>
            }   
            {(props.item.permanentShown || props.item.shown) && props.item.item != null &&
                <C.Icon src={items[props.item.item].icon} alt=""/>
            }
        </C.Container>
    );
}   