import { Link, LinkProps } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type TextLinkProps = {
  children: string | number;
} & LinkProps;

const TextLink = ({ children, ...props }: TextLinkProps): JSX.Element => (
  <Link {...props} className={twMerge('cursor-pointer text-primary', props.className)}>
    {children}
  </Link>
);

export default TextLink;
