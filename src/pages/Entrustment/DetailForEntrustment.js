import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DetailForEntrustment.less';

const { Description } = DescriptionList;

@connect(({ entrustment, loading }) => ({
  entrustment,
  loading: loading.models.entrustment,
}))
class DetailForEnturstment extends Component {
  componentWillMount() {
    const { dispatch, match } = this.props;

    dispatch({
      type: 'entrustment/getReport',
      payload: '320118070301',
    });
  }

  render() {
    const { entrustment = {}, loading } = this.props;
    const { report = { } } = entrustment;
    return (
      <PageHeaderWrapper title="基础详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="申请人信息" style={{ marginBottom: 32 }}>
            <Description term="委托编号">{report.reportno}</Description>
            <Description term="委托日期">{report.reportdate}</Description>
            <Description term="检验费">{report.price}</Description>
            <Description term="申请人">{report.applicant}</Description>
            <Description term="联系人">{report.linkername}</Description>
            <Description term="联系电话">{report.linkerTel}</Description>
            <Description term="代理人">{report.agent}</Description>
            <Description term="联系人">{report.linkername}</Description>
            <Description term="联系电话">{report.linkerTel}</Description>
            <Description term="付款人">{report.payer}</Description>
            <Description term="联系人">{report.linkername}</Description>
            <Description term="联系电话">{report.linkerTel}</Description>
            <Description term="业务分类">{report.tradeway}</Description>
            <Description term="贸易方式">{report.tradeway}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="货物信息" style={{ marginBottom: 32 }}>
            <Description term="运输工具">{report.shipname}</Description>
            <Description term="检查港口">{report.inspplace1}</Description>
            <Description term="预计日期">{report.inspdate}</Description>
            <Description term="现场联系方式">{report.linkerTel}</Description>
            <Description term="货物名称">{report.cargoname}</Description>
            <Description term="货物类别">{report.cargosort}</Description>
            <Description term="申报数量">{report.quantityD}</Description>
            <Description term="证书中文名">{report.remark}</Description>
            <Description term="证书英文名">{report.remark}</Description>
            <Description term="HS编码">{report.remark}</Description>
            <Description term="HS名称">{report.remark}</Description>
            <Description term="到达地点">{report.remark}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="货物信息" style={{ marginBottom: 32 }}>
            <Description term="申请项目">{report.inspway}</Description>
            <Description term="检验要求">{report.inspwaymemo1}</Description>
            <Description term="证书要求">{report.certstyle}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForEnturstment;
