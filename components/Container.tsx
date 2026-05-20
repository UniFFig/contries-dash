import classNames from "classnames";

export interface ContainerProps {
  primary?: boolean;
  style?: string;
  content?: any;
}


const DEFAULT = 'p-8 rounded-xl shadow-lg',
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