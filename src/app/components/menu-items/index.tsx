import { Menu } from '@headlessui/react';

import history from '@history';

type Item = {
  id: string;
  icon: JSX.Element;
  text: string;
  to?: string;
  onClick?: () => void;
};

type MenuItemsProps = {
  data: Item[];
};

const MenuItems = ({ data }: MenuItemsProps) => {
  const handleClick = (to: string | undefined, onClick: (() => void) | undefined) => {
    if (to) {
      return history.push(to);
    }

    return onClick && onClick();
  };

  return (
    <Menu.Items as="section">
      {data.map(({ id, icon, text, to, onClick }) => (
        <Menu.Item
          key={id}
          as="div"
          className="flex items-center px-3 py-2 cursor-pointer hover:bg-secondary-light"
          onClick={() => handleClick(to, onClick)}
        >
          <div className="pr-2">{icon}</div>

          <div className="text-dark">{text}</div>
        </Menu.Item>
      ))}
    </Menu.Items>
  );
};

export default MenuItems;
