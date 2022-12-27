import * as C from "./styles";

type Props = {
    label : string;
    icon? : any;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = (props: Props) => {
    return(
        <C.Container onClick={props.onClick}>
            {props.icon &&
                <C.IconArea>
                    <C.Icon src={props.icon}/>
                </C.IconArea>
        }
            <C.Label>{props.label}</C.Label>
        </C.Container>
    );
}