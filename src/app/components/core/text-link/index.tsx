import { Link, LinkProps } from 'react-router-dom';

type TextLinkProps = {
  children: string | number;
} & LinkProps;

const TextLink = ({ children, ...props }: TextLinkProps): JSX.Element => (
  <Link className="cursor-pointer text-primary" {...props}>
    {children}
  </Link>
);

export default TextLink;
