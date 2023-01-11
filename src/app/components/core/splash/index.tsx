type SplashProps = {
  logo?: boolean;
};

const Splash = ({ logo = false }: SplashProps): JSX.Element => (
  <div id="splash-screen">
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

export default Splash;
