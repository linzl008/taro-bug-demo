import Taro from '@tarojs/taro'

export interface ToastConfig {
  title: string,
  icon?: string,
  image?: string,
  duration?: number,
  mask?: boolean
}

export function Toast({ title, icon = 'none', image, duration = 3000, mask = true }: ToastConfig): void { // 提示框
  Taro.showToast({
    title: title,
    icon: icon,
    image: image,
    duration: duration,
    mask: mask
  })
}

export interface LoadConfig {
  title: string,
  mask?: boolean
}

export function Loading({ title, mask = true }: LoadConfig): void { // 加载框
  Taro.showLoading({
    title: title,
    mask: mask
  })
}

// 时间戳转日期
export function Formatdate(e: number, bool: boolean, hours: boolean) {
  let time = new Date(Number(e));
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  if (hours) {
    return dateFormat(h) + ":" + dateFormat(mm)
  }
  if (bool)
    return (
      y +
      "-" +
      dateFormat(m) +
      "-" +
      dateFormat(d) +
      " " +
      dateFormat(h) +
      ":" +
      dateFormat(mm) +
      ":" +
      dateFormat(s)
    );
  return y + "-" + dateFormat(m) + "-" + dateFormat(d);
}

export function dateFormat(m) {
  return m < 10 ? "0" + m : m;
}

//处理数字显示
export function numFmt(input: any, fixed = 4) {
  if( input == null ){
    return '--'
  }
  return Math.round(input * Math.pow(10,fixed))/ Math.pow(10,fixed)
}


//格式化日期显示
export function dateFmt(time: any, fmt = 'YYYY-MM-DD') {
  if( time == null ){
    return '--'
  }
  //处理IOS下可能存在的时间bug
  if(time.toString().includes('/')){
    time = time.replace(/\//g,'-')
  }
  time = new Date(time)
  let year = time.getFullYear();
  let month = (time.getMonth()+1).toString().padStart(2,0);
  let day = (time.getDate()).toString().padStart(2,0);
  let hours =(time.getHours()).toString().padStart(2,0);
  let min = (time.getMinutes()).toString().padStart(2,0);
  let sec = (time.getSeconds()).toString().padStart(2,0);
  fmt = fmt.replace('YYYY',year)
    .replace('MM',month)
    .replace('DD',day)
    .replace('HH',hours)
    .replace('mm',min)
    .replace('ss',sec)
  return fmt;
}

// 处理状态 num->string
export function solveFmt(num : number|string|undefined) {
  switch (num) {
    case 3:
    case '3': return '未完成';
    case 1:
    case '1': return '已完成';
    default:
      return '--'
  }
}
// 处理状态颜色 num->string
export function solveBgFmt(num : number|string|undefined) {
  switch (num) {
    case 3:
    case '3':
      return 'bg-warning';
    case 1:
    case '1': return 'bg-info';
    default:
      return 'bg-primary'
  }
}

//计算loading状态
export function checkPageLoadState(pageParams:{ page:number,size:number}, total:number) {
  let nowLastItem = (pageParams.page + 1) * (pageParams.size)
  return nowLastItem>=total? 'noMore':'more'
}

//获取数据拼接
export function getURLParams(params: object) {
  let str = '?'
  for (const key in params) {
    str+= `${key}=${params[key]==null?'':params[key]}&`
  }
  return str.slice(0,str.length-1)
}

export function calErrorStatus(num: number): string[] {
  // LOW_BAT(1, "电量低"), //0000 0010
  // SWITCH_ON(2, "移位开关弹起"), //0000 0100
  // OFFLINE(3, "离线"), //0000 1000
  // ON_FAULT(4, "设备故障"), //0001 0000
  // ALARMING(5, "报警中");//0010 0000
  console.log('start->');
  let list: string[] = [],index=0;
  let labelList = ['低电','移位开关弹起','离线','设备故障','报警中']
  while (num>0){
    if (num % 2 && labelList[index]) {
      list.push(labelList[index])
    }
    num = Math.floor(num/2)
    index++
  }
  return list
}
