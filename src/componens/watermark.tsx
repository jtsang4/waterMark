import React from 'react';
import styles from './watermark.module.less';

interface Props { }

interface State {
  waterValue: string;
  waterinputFocus: boolean;
  imgUrl: string;
  imgShow: boolean;
  waterColor: string;
  waterFont: string;
  clearance: number;
}

class Watermark extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      waterValue: '此证件仅供办理XX业务使用，他用无效',
      waterinputFocus: false,
      imgUrl: '',
      imgShow: true,
      waterColor: '#000000',
      waterFont: '10',
      clearance: 100,
    };
  }
  componentDidUpdate() {
    this.addWaterMark();
  }
  // 改变input输入
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.imgShow) {
      alert('请先选择图片');
    } else {
      this.setState({
        waterValue: event.target.value,
      });
    }
  };
  // 聚焦改变input颜色
  focusChange = () => {
    this.setState({
      waterinputFocus: true,
    });
  };
  // 失焦改变input颜色
  blurChange = () => {
    this.setState({
      waterinputFocus: false,
    });
  };
  // 监听颜色变化
  colorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (this.state.imgShow) {
      alert('请先选择图片');
    } else {
      this.setState({
        waterColor: event.target.value,
      });
    }
  };
  // 监听字体大小变化
  fontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.imgShow) {
      alert('请先选择图片');
    } else {
      this.setState({
        waterFont: event.target.value,
      });
    }
  };
  // 监听文字间隙变化
  clearanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.imgShow) {
      alert('请先选择图片');
    } else {
      this.setState({
        clearance: Number(event.target.value),
      });
    }
  };
  //inputchange事件
  inputChange = (event: any) => {
    let reads = new FileReader();
    let file = event.target.files[0];
    reads.readAsDataURL(file);
    reads.onload = (e: any) => {
      this.setState({
        imgUrl: e.target.result,
        imgShow: false,
      });
      let img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        this.addWaterMark();
      };
    };
  };
  // 添加水印
  addWaterMark = () => {
    const { waterColor, waterFont, clearance, waterValue } = this.state;
    const img = document.getElementById('img') as HTMLImageElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const ox = canvas.width / 2;
    const oy = canvas.height / 2;
    canvas.width = img.width;
    canvas.height = img.height;
    // 原图
    ctx.drawImage(img, 0, 0);
    ctx.save();
    // 旋转图
    ctx.translate(ox, oy); // 将绘图圆点移到画布中点
    ctx.rotate((45 * Math.PI) / 180); //弧度 = (Math.PI/180)*角度
    ctx.translate(-ox, -oy);
    // // 创建渐变
    // var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
    // gradient.addColorStop("0","magenta");
    // gradient.addColorStop("0.5","blue");
    // gradient.addColorStop("1.0","red");
    // // 用渐变填色
    // ctx.fillStyle=gradient;
    ctx.fillStyle = waterColor;
    ctx.font = `${waterFont}px Georgia`;
    for (let a = -img.width / clearance; a < img.width / clearance; a++) {
      for (
        let b = -img.height / clearance;
        b < (img.height / clearance) * 2;
        b++
      ) {
        ctx.fillText(waterValue, a * clearance * 2, 10 + b * clearance);
      }
    }
    ctx.restore();
  };
  // 保存图片
  saveImg = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.imgShow) {
      alert('请先选择图片');
      event.preventDefault();
    } else {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      let strDataURI = canvas.toDataURL('image/png');
      let a = document.getElementById('saveimg') as HTMLAnchorElement;
      a.href = strDataURI;
    }
  };
  render() {
    let {
      waterValue,
      waterinputFocus,
      imgUrl,
      imgShow,
      waterColor,
      waterFont,
      clearance,
    } = this.state;
    return (
      <div className={styles.watermark}>
        <div className={styles.header}>
          <label htmlFor="waterValue" className={styles.waterLabel}>
            水印文字
          </label>
          <input
            type="text"
            value={waterValue}
            id="waterValue"
            onFocus={this.focusChange}
            onBlur={this.blurChange}
            className={`${styles.waterinput} ${waterinputFocus ? styles.active : ''}`}
            onChange={this.handleChange}
          />
          <div className={styles.selectImg}>
            <input
              type="file"
              id="inputimg"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              onChange={this.inputChange}
            />
            <label className={styles.labelimg} htmlFor="inputimg">
              选择图片
            </label>
          </div>
          <div className={styles.saveImg} onClick={this.saveImg}>
            <a
              id="saveimg"
              download="imageName.png"
            >
              保存图片
            </a>
          </div>
        </div>
        <div className={styles.config}>
          <div className={styles.waterColor}>
            <label htmlFor="waterColor">水印颜色(点我选择水印颜色)：</label>
            <input
              value={waterColor}
              type="color"
              id="waterColor"
              onChange={this.colorChange}
            />
          </div>
          <div className={styles.waterFont}>
            <label htmlFor="waterFont">字体大小：</label>
            <input
              type="number"
              id="waterFont"
              onChange={this.fontChange}
              value={waterFont}
            />
            px
          </div>
          <div className={styles.clearance}>
            <label htmlFor="clearance">文字间隙：</label>
            <input
              type="number"
              id="clearance"
              onChange={this.clearanceChange}
              value={clearance}
            />
            px
          </div>
        </div>
        <div className={styles.container}>
          <img src={imgUrl} alt="" id="img" className={imgShow ? '' : styles.none} />
          <canvas
            id="canvas"
            className={imgShow ? styles.none : ''}
            width="1000px"
            height="700px"
          ></canvas>
        </div>
      </div>
    );
  }
}

export default Watermark;
