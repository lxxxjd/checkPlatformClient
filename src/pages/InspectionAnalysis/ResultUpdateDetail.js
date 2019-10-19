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
  Modal
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
class ResultUpdateDetail extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    editingKey: '' ,
    testDetail:null,
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
      dataIndex: 'teststandard',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '结果',
      dataIndex: 'testresult',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>录入</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const sampleno = sessionStorage.getItem('sampleno');
    dispatch({
      type: 'inspectionAnalysis/getAllDetails',
      payload:{
         reportno : reportno,
         sampleno : sampleno ,
      }
    });
  }

  back = () =>{
    this.props.history.goBack();
  };

  handleOk = () => {
    const {testDetail} = this.state;
    console.log(testDetail);
    var value = testDetail;
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      value.testresult =  form.getFieldValue('result');
      dispatch({
        type: 'inspectionAnalysis/addResult',
        payload: value,
        callback:response => {
          if(response.code === 200){
            notification.open({
              message: '录入成功',
            });
          }else{
            notification.open({
              message: '录入失败',
              description:response.data,
            });
          }
        }
      });
    });
    this.setState({ visible: false });

  };

  handleCancel = () =>{
    this.setState({ visible: false });
  };

  modifyItem = text => {
    console.log(text);
    this.setState({ testDetail: text});
    this.setState({ visible: true });
  };

  render() {
    const {
      inspectionAnalysis: {detail},
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const {visible,} = this.state;
    const reportno = sessionStorage.getItem('reportno');
    const shipname = sessionStorage.getItem('shipname');
    const sampleno = sessionStorage.getItem('sampleno');
    const reprotText= {
      reportno,
      shipname,
      sampleno,
    };
    return (
      <PageHeaderWrapper text={reprotText}>
        <Card bordered={false} size="small">
            <Row>
            <Col sm={22}>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15 }} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <div className={styles.tableList}>
            <Table
              size="middle"
              loading={loading}
              dataSource={detail}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="keyno"
            />
          </div>
          <Modal
                title="新建样品指标"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Form>
                  <Form.Item label="结果">
                    {getFieldDecorator('result', {
                      rules: [{ required: true, message: '请输入结果' }],
                    })(
                        <Input placeholder="请输入结果" />
                      )}
                  </Form.Item>
                </Form>
              </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ResultUpdateDetail;
