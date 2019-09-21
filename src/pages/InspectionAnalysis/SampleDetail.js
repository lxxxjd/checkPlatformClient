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
  Table,
  Icon,
  Modal,
  notification
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InspectionArrangement.less';


const FormItem = Form.Item;
const { Option } = Select;


/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))

@Form.create()
class SampleDetail extends PureComponent {
  state = {
    formValues: {},
    addOne:false,
    addMany:false,
    onDelete:false,
    selectedRowKeys:[],
    deleteRowKeys:[],
    data:[],
    standard:[],
    itemName: [],
  };

  columns = [
    {
      title: '指标名称',
      dataIndex: 'itemC',
    },
    {
      title: '英文名称',
      dataIndex: 'itemE',
    },
    {
      title: '检测标准',
      dataIndex: 'standard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
  ];


  componentDidMount () {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    dispatch({
      type: 'inspectionAnalysis/getDetails',
      payload:{
         reportno : reportno,
         sampleno : sampleno ,
      }
    });
  }

  back = () =>{
    this.props.history.goBack();
  };
  render() {
    const {
      inspectionAnalysis: {detail,items},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const cargoname = sessionStorage.getItem('cargoname');
    const sampleno = sessionStorage.getItem('sampleno');
    return (
      <PageHeaderWrapper title="样品结果登记">
        <Card bordered={false} size="small">
            <Row>
            <Col sm={5}>
              <span level={4}> 委托编号：{reportno} </span>
            </Col>
            <Col sm={5}>
              <span level={4}> 样品编号：{sampleno} </span>
            </Col>
            <Col sm={12}>
              <span> 货名：{cargoname} </span>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>
                <Icon type="left" />
                返回
              </Button>
            </Col>  
          </Row>
          <div className={styles.tableList}>
            <Table
              size='middle'
              loading={loading}
              dataSource={detail}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="reportno"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SampleDetail;
