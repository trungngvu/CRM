import { useFileParserMutation } from '@store';

function UploadAdapter(loader: { file: Promise<string | Blob> }) {
  const [parser] = useFileParserMutation();
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then(file => {
          body.append('file', file);
          parser(body)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: any) => {
              resolve({
                default: `${res?.data.path}`,
              });
            })
            .catch(err => {
              reject(err);
            });
        });
      });
    },
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useUploadPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: { file: Promise<string | Blob> }) => {
    return UploadAdapter(loader);
  };
}
