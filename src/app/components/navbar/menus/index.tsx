import { MENU } from '@configs';

import Menu from './menu';

type MenusProps = {
  data: MENU[];
};

const Menus = ({ data }: MenusProps): JSX.Element => (
  <div className="flex flex-col px-[10px] w-full h-full py-[10px] shadow-2 gap-y-[10px]">
    {data.map(item => (
      <Menu key={item?.name} data={item} />
    ))}
  </div>
);

export default Menus;
