import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classnames from 'classnames'

import {   PointItem,   } from "@/src/components/common";
import { add, minus, asyncAdd } from '@/src/actions/counter'

import {calErrorStatus} from "@/src/utils";
import './index.scss'


type PageStateProps = {
  counter: {
    num: number
  }
}
type State = {
  list: Array<{
    abnormalStatus: number
    bindingTime: string
    categoryName: string,
    childDevices: Array<{}>
    des?: string,
    imei: string,
    online: boolean,
    position: string,
    receiptUser: string
  }> ,
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface TaskDetail {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class TaskDetail extends Component<IProps,State> {
  config: Config = {
    navigationBarTitleText: '作业详情',
    navigationBarBackgroundColor: '#0C1124',
    navigationBarTextStyle: 'white',
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          abnormalStatus: 1,
          bindingTime: 'bindingTime',
          categoryName: '网关',
          childDevices: [],
          des: 'des',
          imei: 'imei',
          online: false,
          position: '上面',
          receiptUser: ''
        },
      ],
    }
  }

  componentDidMount() {
    console.log(this.$router.params);
    this.setState({
    },()=>{
      this.initData()
    })
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  initData(){
  }
  handleDialogShow(name){
    let temp = {}
    temp[name] = true
    this.setState({
      ...temp
    })
  }
  handleDialogHide(name){
    let temp = {}
    temp[name] = false
    this.setState({
      ...temp
    })
  }
  handleGoDetailClick(item){
    console.log(item);
    Taro.navigateTo({
      url: '/pages/pointDetail/index?positionId='+item.positionId
    })
  }

  render () {
    const { list } = this.state


    const listView = list.map((item,index)=>{
      let tagView = calErrorStatus(item.abnormalStatus).map((tag,index2)=>{
        return <Text className='tag error' key={index2}>{tag}</Text>
      })
      return <View className='mb20' key={index} onClick={()=>this.handleGoDetailClick(item)}>
        <PointItem item={item}  renderTag={<View>{tagView}</View>} />
      </View>
    })
    const cls = classnames({
      'task-detail': true,
      'white-bg': list.length === 0
    })
    return (
      <View className={cls}>
        <View className='color-bg'>
          <View className='mb20'>
          </View>
        </View>
        { list.length === 0 && <View className='empty-block' onClick={()=>this.handleDialogShow('isPointOpened')} >
            <View className='add-icon' />
            <View className='add-label'>点击添加传输点位</View>
        </View> }
        { listView }

      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default TaskDetail as ComponentClass<PageOwnProps, PageState>
