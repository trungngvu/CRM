type LoadingProps = {
  logo?: boolean;
};

const Loading = ({ logo = false }: LoadingProps): JSX.Element => (
  <div className="flex items-center justify-center w-full h-full">
    {logo && (
      <div id="logo">
        <img src="/assets/icons/logo.svg" alt="logo" />
      </div>
    )}

    <div id="spinner">
      <div className="bounce1" />

      <div className="bounce2" />

      <div className="bounce3" />
    </div>
  </div>
);

export default Loading;
