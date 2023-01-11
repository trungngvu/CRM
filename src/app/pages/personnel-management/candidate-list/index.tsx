import { useEffect, useState } from 'react';

import { Button, Loading, Table, TextLink, Time } from '@components';
import { AddIcon } from '@components/core/icons';
import history from '@history';
import useI18n from '@hooks/use-i18n';
import { useGetResumesQuery } from '@store';
import { LANGUAGES, PAGES, ResumeProps } from '@types';

import { en, vi } from './i18n';

const CandidateList = () => {
  const [displayData, setDisplayData] = useState<ResumeProps[]>([]);

  const translate = useI18n({
    name: CandidateList.name,
    data: [
      {
        key: LANGUAGES.EN,
        value: en,
      },
      {
        key: LANGUAGES.VI,
        value: vi,
      },
    ],
  });
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
    stt: key + 1,
    name: <TextLink to={`${PAGES.ADD_CANDIDATE}?id=${value?.id}`}>{value?.name}</TextLink>,
    phoneNumber: value?.phone,
    address: value?.address,
    email: value?.email,
    education: value?.education,
    createdAt: <Time>{value?.createdAt}</Time>,
  }));
  const tableSearchData = displayData.map(value => ({
    name: value?.name,
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
          searchData: tableSearchData,
        }}
      />
    </div>
  );
};

export default CandidateList;
