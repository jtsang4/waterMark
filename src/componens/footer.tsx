import styles from './footer.module.less'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>
        原作者： <a href="https://github.com/wu529778790/shenzjd.com" target="_blank">神族九帝</a>&emsp;
        现源码：<a href="https://github.com/jtsang4/waterMark" target="_blank">Github</a>
      </div>
    </div>
  )
}
export default Footer