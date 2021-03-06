import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { Card, Divider ,Descriptions,Row, Col,  Button,Typography ,Modal,Icon,Table} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import moment from 'moment'
import areaOptions from './areaOptions'

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
    const osspath = text.filepath
    if(osspath === undefined || osspath === null){
      return;
    }
    var extension = osspath.substring(osspath.lastIndexOf(".")+1);
    if(extension==="pdf"){
      dispatch({
        type: 'preMainInfo/getOssPdf',
        payload:{
          osspath
        },
        callback:(response) =>{
          console.log(response);
          if(response.code === 400){
            notification.open({
              message: '打开失败',
              description:response.data,
            });
          }else{
            const url = response.data;
            this.setState({url:url});
            console.log(url);
            window.open(url);
          }
        }
      });
    }else{
      const picUrl = `https://www.smlq.vip/api/cert_report/getFileStream?osspath=${osspath}`;
      window.open(picUrl);
    }
    // this.setState({showVisible:true});
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
    window.close();
  };

  showCancel = () =>{
    this.setState({showVisible:false});
  };

  getPlaceFromCode =(val)=>{
    const onelevel = `${val.substring(0,2)}0000`;
    const twolevel = `${val.substring(0,4)}00`;
    const threelevel = val;
    const oneitem = areaOptions.find(item => item.value === onelevel );
    if(oneitem===undefined){
      return <span>{threelevel}</span>;
    }
    const twoitem = oneitem.children.find(item => item.value === twolevel );
    const threeitem = twoitem.children.find(item => item.value === threelevel );
    return <span>{oneitem.label }/{  twoitem.label}/{   threeitem.label}</span>;
  };

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
                <Icon style={{paddingLeft:5}} type="close" />关闭
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
            <Descriptions.Item label="委托编号">{preMainInfo.reportno20}</Descriptions.Item>
            <Descriptions.Item label="查询密码">{preMainInfo.randomcode}</Descriptions.Item>
            <Descriptions.Item label="委托日期">{moment(preMainInfo.preMainInfodate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="申请人">{preMainInfo.applicant}</Descriptions.Item>
            <Descriptions.Item label="联系人">{preMainInfo.applicantname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{preMainInfo.applicanttel}</Descriptions.Item>
            <Descriptions.Item label="代理人">{preMainInfo.agent}</Descriptions.Item>
            <Descriptions.Item label="联系人">{preMainInfo.agentname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{preMainInfo.agenttel}</Descriptions.Item>
            <Descriptions.Item label="付款人">{preMainInfo.payer}</Descriptions.Item>
            <Descriptions.Item label="检验费">{preMainInfo.price}</Descriptions.Item>
            <Descriptions.Item label="船名标识">{preMainInfo.shipname}</Descriptions.Item>
            <Descriptions.Item label="报关号">{preMainInfo.customsNo}</Descriptions.Item>
            <Descriptions.Item label="海关部门">{preMainInfo.customsName}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检查对象" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="检验机构">{preMainInfo.namec}</Descriptions.Item>
            <Descriptions.Item label="俗名">{preMainInfo.chineselocalname}</Descriptions.Item>
            <Descriptions.Item label="申报数量和单位">{((preMainInfo.quantityd === undefined || preMainInfo.quantityd === null ) ? "":preMainInfo.quantityd+preMainInfo.unit ) }</Descriptions.Item>
            <Descriptions.Item label="到达地点">{(preMainInfo.inspplace1===undefined||preMainInfo.inspplace1===null)?"":this.getPlaceFromCode(preMainInfo.inspplace1)}</Descriptions.Item>
            <Descriptions.Item label="详细地址">{preMainInfo.inspplace2}</Descriptions.Item>
            <Descriptions.Item label="预报日期">{moment(preMainInfo.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
          </Descriptions>
          <Descriptions size="large" title="申请项目" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="申请项目">{preMainInfo.inspway}</Descriptions.Item>
            <Descriptions.Item label="检验备注">{preMainInfo.inspwaymemo1}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false} title="附件">
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
          style={{ top: 10 }}
          width={800}
        >
          <embed src={url} width="700" height="700" type="application/pdf" />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForUnAccept;
