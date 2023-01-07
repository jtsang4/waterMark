import Watermark from './componens/watermark'
import Footer from './componens/footer'
import styles from './App.module.less'

function App() {
  return (
    <div className={styles.App}>
      <header>
        <h1>水墨清香：一款本地水印添加工具</h1>
        <h5>加水印操作在本地完成，任何证件信息不会上传到网站，请放心使用
          <a href="https://github.com/jtsang4/waterMark"
            target="_blank">开源更放心</a>
        </h5>
      </header>
      <Watermark />
      <Footer />
    </div>
  );
}

export default App;
