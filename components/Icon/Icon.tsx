import { FC } from "react";
import * as icons from "../../assets/icons";

interface IconProps {
  className?: string;
  name: keyof typeof icons;
}

const Icon:FC<IconProps> = ({ name, className }) => {
  const icon = icons[name];

  return (
    <svg className={className}>
      <use href={`#${icon.id}`}></use>
    </svg>
  )
}


export default Icon;
