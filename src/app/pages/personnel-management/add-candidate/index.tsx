import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Input, Loading, PopupDelete } from '@components';
import { AddIcon, DeleteIcon, SaveIcon } from '@components/core/icons';
import useI18n from '@hooks/use-i18n';
import { API_CONFIG } from '@src/app/configs';
import useModal from '@src/app/hooks/use-modal';
import {
  useDeleteResumeByIdMutation,
  useGetResumeByIdQuery,
  useResumeParserMutation,
  useUpdateResumeMutation,
} from '@store';
import { PAGES, ResumeParserResponse } from '@types';

import languages from './i18n';

const AddCandidate = () => {
  const translate = useI18n(languages);

  const { open, close, Popup } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResumeParserResponse>();

  const { BASE_URL, RESUME } = API_CONFIG;

  const [filePdf, setFilePdf] = useState<File | string>();
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumbers] = useState(1);
  const [sex, setSex] = useState('');

  const navigate = useNavigate();

  const [parser, { data: parserData, isLoading }] = useResumeParserMutation();
  const [updateCv, { isSuccess, isError }] = useUpdateResumeMutation();
  const [deleteCv, { isLoading: isLoadingDelete }] = useDeleteResumeByIdMutation();
  const [searchParams] = useSearchParams();
  const idCv = searchParams.get('id');

  const cvDetail = useGetResumeByIdQuery(
    {
      id: idCv,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !idCv,
    }
  );

  const inputFile = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  useEffect(() => {
    if (cvDetail && cvDetail.data) {
      reset(cvDetail.data);
      const path = cvDetail.data.path.split('/').pop();
      setFilePdf(`${BASE_URL}${RESUME}/cv/${path}`);
      setSex(cvDetail.data.sex);
    }
  }, [cvDetail]);

  const handleChangeSex = (_: ChangeEvent<HTMLInputElement>, data: string) => {
    setSex(data);
  };

  const onSubmit = async (data: ResumeParserResponse) => {
    await updateCv(data);
    navigate(PAGES.CANDIDATE_LIST);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(translate('POST_SUCCESS'), {
        theme: 'light',
      });
    }
    if (isError) {
      toast.error(translate('POST_ERROR'));
    }
  }, [isSuccess, isError]);

  const handleFileChange = (data: ChangeEvent<HTMLInputElement>) => {
    const file = data.target.files;
    if (file) {
      setFilePdf(file[0]);
    }
  };

  const onLoadPageDocument = (pdf: { numPages: number }) => {
    setNumPages(pdf.numPages);
  };

  const handleNextPage = () => {
    setPageNumbers(pageNumber + 1);
  };

  const handlePrePage = () => {
    setPageNumbers(pageNumber - 1);
  };

  useEffect(() => {
    if (filePdf && typeof filePdf !== 'string') {
      const formData = new FormData();
      formData.append('file', filePdf as Blob);
      parser(formData);
    }
  }, [filePdf]);

  useEffect(() => {
    if (parserData !== undefined) {
      reset(parserData);
    }
  }, [parserData && filePdf]);

  const handleDeleteCv = async () => {
    let id = null;
    if (parserData) {
      id = parserData.id;
    }
    if (cvDetail.data) {
      id = cvDetail.data.id;
    }
    if (id) await deleteCv({ id });
    close();
    navigate(PAGES.CANDIDATE_LIST);
    toast.success(translate('DELETE_CV_TOASTIFY'));
  };

  return (
    <div className="flex flex-col mx-4">
      <div className="flex items-center justify-between mt-[18px]">
        <div className="flex items-center">
          <Link className="pr-3" to={PAGES.CANDIDATE_LIST}>
            <img width={10} src="/assets/icons/chevron-right.svg" alt="logo" />
          </Link>
          <div className="font-bold text-[20px] ">{translate('ADD_CV')}</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3">
            <Button
              color="primary"
              shape="round"
              iconOptions={{
                icon: SaveIcon,
              }}
              disabled={!parserData && typeof filePdf !== 'string'}
            >
              {translate('SAVE')}
            </Button>
            <Button
              iconOptions={{
                icon: DeleteIcon,
              }}
              shape="round"
              color="secondary"
              isLoading={isLoadingDelete}
              onClick={open}
              disabled={!parserData && typeof filePdf !== 'string'}
            >
              {translate('CANCEL')}
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col border-[1px] border-secondary-light border-solid rounded-[5px] bg-white mt-[15px] min-h-max mb-[27px]">
        <div className="flex flex-row gap-[7px]  items-center">
          <div className="mt-[15px] ml-[12px] mb-[14px]">File tải lên</div>
          <input
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            id="contained-button-file"
            name="contained-button-file"
            ref={inputFile}
          />
          <div>
            <label htmlFor="contained-button-file">
              <Button
                shape="round"
                onClick={handleClick}
                iconOptions={{
                  icon: AddIcon,
                }}
              >
                {translate('UPLOAD_CV')}
              </Button>
            </label>
          </div>
        </div>
        <div className="flex flex-row gap-[20px]">
          <div className=" w-1/2 max-h-fit border relative border-secondary-light border-solid rounded-[5px] ml-4 mb-4">
            <div className="min-h-[826px] max-h-max m-1 flex flex-col">
              <div className="flex flex-col mx-auto text-center">
                <Document
                  noData={`${translate('CHOSE_FILE')}`}
                  loading={`${translate('PLEASE_WAIT')}`}
                  onLoadSuccess={onLoadPageDocument}
                  error={
                    <div className="text-error">
                      {translate('ERROR')}
                      <br />
                      {translate('CHOSE_FILE')}
                    </div>
                  }
                  file={filePdf}
                >
                  <Page renderTextLayer={false} pageNumber={pageNumber} />
                </Document>
                {(parserData || cvDetail.data) && (
                  <div className="bottom-0 flex items-center justify-center ">
                    <Button
                      color="primary"
                      className="cursor-pointer"
                      onClick={handlePrePage}
                      disabled={pageNumber <= 1}
                    >{`<`}</Button>

                    <p className="px-3">{`${translate('PAGE')} ${pageNumber}/${numPages}`}</p>

                    <Button
                      color="primary"
                      className="cursor-pointer"
                      onClick={handleNextPage}
                      disabled={pageNumber >= numPages}
                    >{`>`}</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="flex flex-col gap-[5px] mr-4">
                <Input
                  labelOptions={{
                    text: translate('FULL_NAME'),
                  }}
                  isRequired
                  {...register('name')}
                />
                <Input
                  labelOptions={{
                    text: translate('EMAIL'),
                  }}
                  errorOptions={{
                    message: errors.email?.message,
                  }}
                  isRequired
                  {...register('email')}
                />
                <Input
                  labelOptions={{
                    text: translate('PHONE_NUMBER'),
                  }}
                  isRequired
                  {...register('phone')}
                />
                <div className=" flex flex-col gap-[12px]">
                  <div>{translate('GENDER')} *</div>
                  <RadioGroup onChange={handleChangeSex} row aria-labelledby="demo-row-radio-buttons-group-label">
                    <FormControlLabel
                      value="nam"
                      control={<Radio />}
                      label={translate('MALE')}
                      {...register('sex')}
                      checked={sex === ('nam' || 'male')}
                    />
                    <FormControlLabel
                      value="nu"
                      control={<Radio />}
                      label={translate('FEMALE')}
                      {...register('sex')}
                      checked={sex === ('nu' || 'female')}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label={translate('OTHER')}
                      {...register('sex')}
                      checked={sex === 'other'}
                    />
                  </RadioGroup>
                </div>
                <Input
                  labelOptions={{
                    text: translate('ADDRESS'),
                  }}
                  isRequired
                  {...register('address')}
                />
                <Input
                  labelOptions={{
                    text: translate('EDUCATION_LEVEL'),
                  }}
                  isRequired
                  {...register('education')}
                />
                <Input
                  labelOptions={{
                    text: translate('SKILL'),
                  }}
                  isRequired
                  {...register('skill')}
                />
                <Input
                  labelOptions={{
                    text: translate('CERTIFICATE'),
                  }}
                  {...register('certificate')}
                />
                <Input
                  labelOptions={{
                    text: translate('TARGET_IN_JOB'),
                  }}
                  {...register('careerGoals')}
                />
                <Input
                  labelOptions={{
                    text: translate('EXPERIENCE'),
                  }}
                  {...register('experience')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Popup>
        <PopupDelete
          isLoading={isLoadingDelete}
          onSubmit={handleDeleteCv}
          onCancel={close}
          header={translate('DELETE_CV_CONFIRM')}
          content={translate('DELETE_CV_CONFIRM_QUESTION')}
        />
      </Popup>
    </div>
  );
};

export default AddCandidate;
