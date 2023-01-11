import { useEffect, useState } from 'react';

type UseFontsProps = { fonts: string[] };

const useFonts = ({ fonts }: UseFontsProps): boolean => {
  const [isFontsReady, setIsFontsReady] = useState(false);

  useEffect(() => {
    const fetchFont = async () => {
      await Promise.all(fonts.map(font => document.fonts.load(font)));

      setIsFontsReady(true);
    };

    fetchFont().catch(() => {
      setIsFontsReady(true);
    });
  }, [fonts]);

  return isFontsReady;
};

export default useFonts;
