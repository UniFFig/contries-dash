import classNames from "classnames";
import { ContainerProps } from "@/types/types";

const DEFAULT = 'flex p-8 rounded-xl shadow-lg w-full justify-center',
PRIMARY = 'bg-white',
SECONDARY = 'bg-primary_medium'

export const Container = ({
  primary,
  style,
  content
}: ContainerProps) => {

  if(!content){
    return null
  }

  return (
    <div className={classNames(DEFAULT, primary ? PRIMARY : SECONDARY, style)}>
        {content}
    </div>
  );
};