// import { ComponentClass } from 'react'
import Taro, {Component} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import classnames from 'classnames'

import './index.scss'

type Item = {
  abnormalStatus: number
  bindingTime: string
  categoryName: string,
  childDevices: Array<{}>
  des?: string,
  imei: string,
  online: boolean,
  position: string,
  receiptUser: string
}

type Props = {
  item: Item,
  renderTag: any
}
type State = {
}

export default class PointItem extends Component<Props, State> {

  static defaultProps = {
    item:{
      abnormalStatus: 0,
      categoryName: '',
      imei: '',
      online: false,
      position: '',
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    // const listView = [1,2,3].map(item=>{
    //   return <View key={item}>{item}</View>
    // })

    return (
      <View className='point-item'>
        <View className='line-1 flex'>
          <View className='left'>
            <Text className='device-name'>{this.props.item.categoryName}</Text>
            <Text className='imei'>{this.props.item.imei}</Text>
            { this.props.item.online && <Text className='tag normal'>在线</Text> }
            {this.props.renderTag}
          </View>
        </View>
        <View className='label'>
          位置：{this.props.item.position}
        </View>
      </View>
    )
  }
}
