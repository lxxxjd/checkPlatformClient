import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Card,
  Row,
  Col,
  Input
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UEditorText.less';


const formItemLayout = {
  labelCol:{
    xs:{span: 24},
    sm :{span: 7},
  },
  wrapperCol:{
    xs:{span: 24},
    sm :{span: 7},
    md :{ span: 10 },
  }
};
const FormItem = Form.Item;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class UEditorText extends PureComponent {



  componentDidMount() {
    console.log(UE);
    UE.getEditor("content");
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        form.setFieldsValue({
          'content':UE.getEditor('content').getContent()
        });
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {

    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form className={styles.ueditForm} onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('content', {
                initialValue:'<p>eee</p>',
              })(<textarea id="content" />)}
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UEditorText;
