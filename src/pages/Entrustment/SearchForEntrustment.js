import React, { PureComponent } from 'react';
import { Card, Button, DatePicker, Form, Col, Row, Input, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { Option } = Select;

const fieldLabels = {
  entrustmentCode: '委托编号',
  entrustmentPerson: '委托人',
  shipName: '船名',
  entrustmentDate: '委托日期',
  goodName: '货名',
};
@Form.create()
class SearchForEntrustment extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {

    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <PageHeaderWrapper
        title="高级表单"
        content="高级表单常见于一次性输入和提交大批量数据的场景。"
      >
        <Card className={styles.card} bordered={false}>
          <Form hideRequiredMark labelAlign="left">
            <Row gutter={16}>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.entrustmentCode}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('entrustmentCode')(
                    <Input style={{ width: '100%' }} placeholder="委托编号" />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.entrustmentPerson}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('entrustmentPerson')(
                    <Input style={{ width: '100%' }} placeholder="委托人" />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.shipName}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('shipName')(
                    <Input style={{ width: '100%' }} placeholder="船名" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.entrustmentDate}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('entrustmentDate')(
                    <DatePicker
                      placeholder="委托日期"
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                  label={fieldLabels.entrustmentPerson}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  colon={false}
                >
                  {getFieldDecorator('entrustmentPerson')(
                    <Input style={{ width: '100%' }} placeholder="委托人" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default SearchForEntrustment;
