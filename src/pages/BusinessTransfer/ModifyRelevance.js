import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Modal,
  Checkbox,
  Radio,
  Table,
  Typography
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './EntrustmentRelevance.less';

const { Title  } = Typography;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ entrustment, loading }) => ({
  entrustment,
  loading: loading.models.entrustment,
}))

@Form.create()
class ModifyRelevance extends PureComponent {
  state = {
    data:[],
  };

  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      // render: val => <span>{
      //   moment(val).format('YYYY-MM-DD HH:mm:ss')
      // }</span>
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
    },
    {
      title: '运输工具',
      dataIndex: 'shipname',
    },
    {
      title: '货名',
      dataIndex: 'cargoname',
    },
    {
      title: '申请项目',
      dataIndex: 'inspway',
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'entrustment/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'entrustment/fetch',
      payload: params,
    });
  };

  previewItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      state:text.reportno,
    });
  };
  copyItem = text => {
    router.push({
      pathname:'/Entrustment/ModifyForEntrustment',
      reportNo:text.reportno,
    });
  };
  copyItem = text => {
    router.push({
      pathname:'/Entrustment/DetailForEntrustment',
      reportNo:text.reportno,
    });
  };
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  render() {
    const {
      //entrustment: {data},
      loading,
    } = this.props;
    const { data} = this.state;
    return (
      <PageHeaderWrapper title="修改委托关联">     
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={2}>
              <Button type="primary" onClick={this.validate}>保存</Button>
            </Col>
            <Col span={12}>
            </Col>
            <Col span={5}>
              <Title level={4} > 委托号:{}</Title>
            </Col>
            <Col span={5}>
              <Title level={4} > 运输工具:{}</Title>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              rowSelection={this.rowSelection}
              loading={loading}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              dataSource={data}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ModifyRelevance;
