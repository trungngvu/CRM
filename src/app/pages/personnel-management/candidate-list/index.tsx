import { useEffect, useState } from 'react';

import { Button, Loading, Table, TextLink, Time } from '@components';
import { AddIcon } from '@components/core/icons';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { useGetResumesQuery } from '@store';
import { PAGES, ResumeProps } from '@types';

import languages from './i18n';

const CandidateList = () => {
  const [displayData, setDisplayData] = useState<ResumeProps[]>([]);

  const translate = useI18n(languages);
  const { data: resumeData, isLoading } = useGetResumesQuery(null, { refetchOnMountOrArgChange: true });

  /**
   * Filter data by status
   */
  useEffect(() => {
    if (resumeData) {
      setDisplayData(resumeData?.data || []);
    }
  }, [resumeData]);

  const onClickAddCandidate = () => history.push(PAGES.ADD_CANDIDATE);

  /**
   * Table data
   */
  const tableColumns = [
    { value: 'stt', label: translate('STT') },
    { value: 'name', label: translate('NAME') },
    { value: 'phoneNumber', label: translate('PHONE_NUMBER') },
    { value: 'address', label: translate('ADDRESS') },
    { value: 'email', label: translate('EMAIL') },
    { value: 'education', label: translate('EDUCATION') },
    { value: 'createdAt', label: translate('CREATED_AT') },
  ];
  const tableData = displayData.map((value, key) => ({
    id: value?.id,
    stt: <div>{key + 1}</div>,
    name: <TextLink to={`${PAGES.ADD_CANDIDATE}?id=${value?.id}`}>{value?.name}</TextLink>,
    phoneNumber: <div>{value?.phone}</div>,
    address: <div>{value?.address}</div>,
    email: <div>{value?.email}</div>,
    education: <div>{value?.education}</div>,
    createdAt: <Time>{value?.createdAt}</Time>,
  }));

  /**
   * Display loading if is loading get candidate list
   */
  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="flex flex-col h-full p-4 gap-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-dark">{translate('CANDIDATE_LIST')}</div>

        <Button
          shape="round"
          iconOptions={{
            icon: AddIcon,
            size: 20,
          }}
          onClick={onClickAddCandidate}
        >
          {translate('ADD_CANDIDATE')}
        </Button>
      </div>

      <Table
        columns={tableColumns}
        data={tableData}
        searchOptions={{
          display: true,
          rootData: displayData,
        }}
      />
    </div>
  );
};

export default CandidateList;
