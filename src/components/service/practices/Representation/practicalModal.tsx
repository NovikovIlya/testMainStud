import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import type { TableProps } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { FilterType, GetColumnSearchProps } from '../../../../models/representation';

const filterSpecialization: FilterType[] = [
  { value: 'Все', label: 'Все' },
  { value: '1', label: '1' },
];

// @ts-ignore
const PracticeModal = ({isOpen,onCancel,onSelectPractice,tableData,filter,setFilter,
}) => {
  const tableRef = useRef(null);
  const searchInput = useRef<any>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const getColumnSearchProps = (dataIndex: any): GetColumnSearchProps => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Искать
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columnsRepresentation = [
    {
      key: 'specialtyName',
      dataIndex: 'specialtyName',
      title: 'Шифр и иаименование документа',
      name: 'Шифр и иаименование документа',
      className: 'text-xs !p-2',
      ...getColumnSearchProps('name'),
    },
    {
      key: 'academicYear',
      dataIndex: 'academicYear',
      title: 'Учебный год',
      className: 'text-xs !p-2',
    },

    {
      key: 'groupNumber',
      dataIndex: 'groupNumber',
      title: 'Номер группы',
      className: 'text-xs !p-2',
    },
    {
      key: 'level',
      dataIndex: 'level',
      title: 'Уровень образования',
      className: 'text-xs !p-2',
      editable: true,
    },
    {
      key: 'course',
      dataIndex: 'courseNumber',
      title: 'Курс',
      className: 'text-xs !p-2',
      editable: true,
    },
  ];

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleRowClick = (record: any) => {
    onSelectPractice(record.id);
  };

  return (
    <Modal
      footer={null}
      width={'100%'}
      title="Выберите практику"
      open={isOpen}
      onCancel={onCancel}
    >
      <Row gutter={[8, 16]} className="mt-12 w-full flex items-center">
        <Col span={4}>
          <Typography.Text>Подразделение</Typography.Text>
        </Col>
        <Col span={8}>
          <Select
            popupMatchSelectWidth={false}
            defaultValue="Все"
            className="w-full"
            options={filterSpecialization}
            onChange={(value) => {
              setFilter({
                ...filter,
                subdivision: value,
              });
            }}
          />
        </Col>
      </Row>
      {/* ... other filter rows ... */}
      <Table
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        ref={tableRef}
        bordered
        dataSource={tableData ? tableData : []}
        columns={columnsRepresentation}
        rowClassName="editable-row"
        pagination={false}
        rowKey="id"
      />
    </Modal>
  );
};

export default PracticeModal;