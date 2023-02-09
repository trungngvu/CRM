import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { Control, FieldValues } from 'react-hook-form';

import { useFileParserMutation } from '@src/app/store/api/files';
import { SelectItem } from '@types';

import MultiField from '../multi-fields';

type ConfigType = {
  type: string;
  label: string;
  data?: SelectItem[];
  placeholder?: string;
  name: string;
  isRequire?: boolean;
};

type TextEditorProps = {
  config: ConfigType[];
  control: Control<FieldValues>;
  onChangeDsc: (event: Event, editor: typeof ClassicEditor) => void;
  onChangeEtm?: (event: ChangeEvent<HTMLInputElement>) => void;
  valueEtmTime?: string;
  placeholderEditor: string;
  description?: string | undefined;
  errors?: FieldValues | undefined;
  isValidateDsc?: boolean;
  editorErrorMess?: string;
};

const TextEditor = ({
  config,
  control,
  onChangeEtm,
  onChangeDsc,
  valueEtmTime,
  placeholderEditor,
  editorErrorMess,
  description,
  errors,
  isValidateDsc,
}: TextEditorProps) => {
  const [parser] = useFileParserMutation();

  const uploadAdapter = (loader: { file: Promise<string | Blob> }) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then(file => {
            body.append('file', file);
            parser(body)
              .unwrap()
              .then(res => {
                resolve({
                  default: res.path,
                });
              })
              .catch(err => {
                reject(err);
              });
          });
        });
      },
    };
  };

  function uploadPlugin(editor: typeof ClassicEditor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: { file: Promise<string | Blob> }) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={description || ''}
          onChange={onChangeDsc}
          config={{
            placeholder: placeholderEditor,
            autoGrow_onStartup: 'True',
            toolbarLocation: 'bottom',
            extraPlugins: [uploadPlugin],
          }}
        />
        {isValidateDsc && <p className="text-sm text-error">{editorErrorMess}</p>}
      </div>
      <div
        className={clsx(
          'grid gap-5 pt-5 sm:grid-cols-1 md:grid-cols-2 ',
          config.length === 5 ? 'xl:grid-cols-5' : 'xl:grid-cols-4'
        )}
      >
        <MultiField
          dataField={config}
          control={control}
          errors={errors}
          onChangeEtm={onChangeEtm}
          valueEtmTime={valueEtmTime}
        />
      </div>
    </>
  );
};

export default TextEditor;
