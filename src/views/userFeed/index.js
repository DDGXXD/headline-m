export default {
  name: 'userFeedBack',
  data() {
    return {
      introductionInfo: '',
      phoneNum: ''
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    }
  }
}
