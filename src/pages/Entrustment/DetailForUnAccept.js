import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { Card, Divider ,Descriptions,Row, Col,  Button,Typography ,Modal,Icon,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import moment from 'moment'
const { Title} = Typography;
@connect(({ preMainInfo, loading }) => ({
  preMainInfo,
  loading: loading.models.preMainInfo,
}))
class DetailForUnAccept extends Component {
  state = {
    visible: false ,
    showVisible:false,
    url:"",
    preMainInfo:{}
  };
  columns = [
    {
      title: '记录名',
      dataIndex: 'recordname',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => <span>{
         moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  componentWillMount() {
    const prereportno = sessionStorage.getItem("prereportno");
    const { dispatch } = this.props;
    dispatch({
      type: 'preMainInfo/getPremaininfo',
      payload: {
        prereportno,
      },
      callback : response =>{
        if(response.code === 200){
          this.setState({preMainInfo:response.data});
        }
      }
    });
    dispatch({
      type: 'preMainInfo/getPreRecord',
      payload: {
        prereportno,
      }
    });
  }
  previewItem = text => {
    const { dispatch } = this.props;
    dispatch({
      type: 'preMainInfo/getOssPdf',
      payload:{
        osspath:text.filepath
      },
      callback:(response) =>{
        if(response.code === 400){
          notification.open({
            message: '打开失败',
            description:response.data,
          });
        }else{
          this.setState({url:response.data});
        }
      }
    });
    this.setState({showVisible:true});
  };

  handleOk = e => {
    console.log(e);
    const { dispatch, match } = this.props;
    const preMainInfonNo = sessionStorage.getItem("preMainInfono");
    dispatch({
      type: 'preMainInfo/remove',
      payload: {preMainInfono:preMainInfonNo},
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

  deletepreMainInfo = () => {
    this.setState({
      visible: true,
    });
  };

  back = () =>{
    this.props.history.goBack();
  };

  showCancel = () =>{
    this.setState({showVisible:false});
  }
  render() {
    const {
      preMainInfo:{preRecordData},
      loading
    } = this.props;
    const { showVisible ,url, preMainInfo} = this.state;
    return (
      <PageHeaderWrapper loading={loading}>
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={3}>
              <Title level={3}>申请详情</Title>
            </Col>
            <Col span={19}>
            </Col>
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15}} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
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
          <Descriptions size="large" title="业务信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="委托编号">{preMainInfo.preMainInfono}</Descriptions.Item>
            <Descriptions.Item label="查询密码">{preMainInfo.randomcode}</Descriptions.Item>
            <Descriptions.Item label="委托日期">{moment(preMainInfo.preMainInfodate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="申请人">{preMainInfo.preMainInfo}</Descriptions.Item>
            <Descriptions.Item label="联系人">{preMainInfo.preMainInfoname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{preMainInfo.preMainInfotel}</Descriptions.Item>
            <Descriptions.Item label="代理人">{preMainInfo.agent}</Descriptions.Item>
            <Descriptions.Item label="联系人">{preMainInfo.agentname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{preMainInfo.agenttel}</Descriptions.Item>
            <Descriptions.Item label="付款人">{preMainInfo.payer}</Descriptions.Item>
            <Descriptions.Item label="检验费">{preMainInfo.price}</Descriptions.Item>
            <Descriptions.Item label="船名标识">{preMainInfo.shipname}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检查对象" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="检验机构">{preMainInfo.certcode}</Descriptions.Item>
            <Descriptions.Item label="俗名">{preMainInfo.chineselocalname}</Descriptions.Item>
            <Descriptions.Item label="申报数量和单位">{((preMainInfo.quantityd === undefined || preMainInfo.quantityd === null ) ? "":preMainInfo.quantityd  )+preMainInfo.unit }</Descriptions.Item>
            <Descriptions.Item label="到达地点">{preMainInfo.inspplace1}</Descriptions.Item>
            <Descriptions.Item label="详细地址">{preMainInfo.inspplace2}</Descriptions.Item>
            <Descriptions.Item label="预报日期">{moment(preMainInfo.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="large" title="申请项目" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="申请项目">{preMainInfo.inspway}</Descriptions.Item>
            <Descriptions.Item label="检验备注">{preMainInfo.inspwaymemo1}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false}  title="附件">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={preRecordData}
              columns={this.columns}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Modal
          title="记录详情"
          visible={showVisible}
          onCancel={this.showCancel}
          footer={null}
          width={800}
        >
          <embed src={url} width="700" height="700"/>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForUnAccept;
