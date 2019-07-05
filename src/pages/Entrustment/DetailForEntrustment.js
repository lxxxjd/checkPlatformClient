import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider ,Descriptions,Row, Col,  Button,Typography ,Modal} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DetailForEntrustment.less';

const { Title } = Typography;
@connect(({ entrustment, loading }) => ({
  entrustment,
  loading: loading.models.entrustment,
}))
class DetailForEnturstment extends Component {
  state = { visible: false };
  componentWillMount() {
    const { dispatch, match } = this.props;

    dispatch({
      type: 'entrustment/getReport',
      payload: '320118070301',
    });
  }
  handleOk = e => {
    console.log(e);
    const { dispatch, match } = this.props;
    dispatch({
      type: 'entrustment/remove',
      payload: {reportno:'320118070301'},
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  deleteReport = () => {
    this.setState({
      visible: true,
    });
  };
  render() {
    const { entrustment = {}, loading } = this.props;
    const { report = { } } = entrustment;
    return (
      <PageHeaderWrapper  loading={loading}>
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={3}>
              <Title level={3} >委托申请</Title>
            </Col>
            <Col span={19}>
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.deleteReport}>撤销申请</Button>
            </Col>
          </Row>
          <Modal
          title="确认"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          >
            <p>是否撤销</p>
          </Modal>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions  size="large" title="申请人信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="委托编号">{report.reportno}</Descriptions.Item>
            <Descriptions.Item label="委托日期">{report.reportdate}</Descriptions.Item>
            <Descriptions.Item label="检验费">{report.price}</Descriptions.Item>
            <Descriptions.Item label="申请人">{report.applicant}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.linkername}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.linkertel}</Descriptions.Item>
            <Descriptions.Item label="代理人">{report.agent}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.linkername}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.linkertel}</Descriptions.Item>
            <Descriptions.Item label="付款人">{report.payer}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.linkername}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.linkertel}</Descriptions.Item>
            <Descriptions.Item label="业务分类">{report.tradeway}</Descriptions.Item>
            <Descriptions.Item label="贸易方式">{report.tradeway}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="货物信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="运输工具">{report.shipname}</Descriptions.Item>
            <Descriptions.Item label="检查港口">{report.inspplace1}</Descriptions.Item>
            <Descriptions.Item label="预计日期">{report.inspdate}</Descriptions.Item>
            <Descriptions.Item label="现场联系方式">{report.insplinkway}</Descriptions.Item>
            <Descriptions.Item label="货物名称">{report.cargoname}</Descriptions.Item>
            <Descriptions.Item label="货物类别">{report.cargosort}</Descriptions.Item>
            <Descriptions.Item label="申报数量">{report.quantityd}</Descriptions.Item>
            <Descriptions.Item label="证书中文名">{report.remark}</Descriptions.Item>
            <Descriptions.Item label="证书英文名">{report.remark}</Descriptions.Item>
            <Descriptions.Item label="HS编码">{report.remark}</Descriptions.Item>
            <Descriptions.Item label="HS名称">{report.remark}</Descriptions.Item>
            <Descriptions.Item label="到达地点">{report.remark}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检验要求" style={{ marginBottom: 32 }} bordered >
            <Descriptions.Item label="申请项目" >{report.inspway}</Descriptions.Item>
            <Descriptions.Item label="检验要求" >{report.inspwaymemo1}</Descriptions.Item>
            <Descriptions.Item label="证书要求" >{report.certstyle}</Descriptions.Item>
          </Descriptions>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForEnturstment;
