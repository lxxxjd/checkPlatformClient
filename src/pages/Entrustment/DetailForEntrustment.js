import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider ,Descriptions,Row, Col,  Button,Typography ,Modal} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DetailForEntrustment.less';
import moment from 'moment'
const { Title } = Typography;
@connect(({ entrustment, loading }) => ({
  entrustment,
  loading: loading.models.entrustment,
}))
class DetailForEnturstment extends Component {
  state = { visible: false };


  componentWillMount() {
    const reportnNo = sessionStorage.getItem("reportno");
    const { dispatch } = this.props;
    dispatch({
      type: 'entrustment/getReport',
      payload: reportnNo,
    });
  }

  handleOk = e => {
    console.log(e);
    const { dispatch, match } = this.props;
    const reportnNo = sessionStorage.getItem("reportno");
    dispatch({
      type: 'entrustment/remove',
      payload: {reportno:reportnNo},
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
      <PageHeaderWrapper loading={loading}>
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={3}>
              <Title level={3}>委托详情</Title>
            </Col>
            <Col span={21}>
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
          <Descriptions  size="large" title="业务信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="委托编号">{report.reportno}</Descriptions.Item>
            <Descriptions.Item label="委托日期">{moment(report.reportdate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="检验费">{report.price}</Descriptions.Item>
            <Descriptions.Item label="申请人">{report.applicant}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.applicantname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.applicanttel}</Descriptions.Item>
            <Descriptions.Item label="代理人">{report.agent}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.agentname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.agenttel}</Descriptions.Item>
            <Descriptions.Item label="付款人">{report.payer}</Descriptions.Item>
            <Descriptions.Item label="业务来源">{report.businesssource}</Descriptions.Item>
            <Descriptions.Item label="贸易方式">{report.tradeway}</Descriptions.Item>
            <Descriptions.Item label="证书要求" >{report.certstyle}</Descriptions.Item>
            <Descriptions.Item label="业务分类">{report.businesssort}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检查对象" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="货物名称">{report.cargoname}</Descriptions.Item>
            <Descriptions.Item label="中文俗名">{report.chineselocalname}</Descriptions.Item>
            <Descriptions.Item label="运输工具">{report.shipname}</Descriptions.Item>
            <Descriptions.Item label="申报数量和单位">{report.quantityd+report.unit}</Descriptions.Item>
            <Descriptions.Item label="检验时间">{report.inspdate}</Descriptions.Item>
            <Descriptions.Item label="检查港口">{report.inspplace2}</Descriptions.Item>
            <Descriptions.Item label="到达地点">{report.inspplace1}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检查项目" style={{ marginBottom: 32 }} bordered >
            <Descriptions.Item label="申请项目" >{report.inspway}</Descriptions.Item>
            <Descriptions.Item label="检验备注" >{report.inspwaymemo1}</Descriptions.Item>
          </Descriptions>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForEnturstment;
