<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <Form ref="target" :validation-schema="mySchema" v-slot="{ errors }" class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <Field
          placeholder="请输入你的手机号"
          v-model="form.phone"
          name="phone"
          :class="{ error: errors.phone}"
        />
        <span class="error-msg"> {{ errors.phone}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <Field
          placeholder="请输入你的验证码"
          v-model="form.code"
          name="code"
          :class="{ error: errors.code}"
        />
        <button style="width: 100px; height: 38px" @click="getCode">
          获取验证码
        </button>
        <span class="error-msg">{{ errors.code }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <Field
          placeholder="请输入你的密码"
          v-model="form.password"
          name="password"
          :class="{ error: errors.password}"
        />
        <span class="error-msg">{{ errors.password }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <Field
          placeholder="请输入确认密码"
          v-model="form.password1"
          name="password1"
          :class="{ error: errors.password1}"
        />
        <span class="error-msg">{{ errors.password1 }}</span>
      </div>
      <div class="controls">
        <Field
          type="checkbox"
          v-model="form.agree"
          name="agree"
          :class="{ error: errors.agree}"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.agree }}</span>
      </div>
      <div class="btn">
        <button @click.prevent="userRegister">完成注册</button>
      </div>
    </Form>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate';
import schema from "@/plugins/validate";

export default {
  name: "MyRegister",
  data() {
    return {
      // 收集表单数据
      form:{
        phone: "", // 手机号
        code: "", // 验证码
        password: "", // 密码
        password1: "", // 确认密码
        agree: true, // 是否同意
      },
      
      mySchema:{
        phone: schema.phone, // 手机号
        code: schema.code, // 验证码
        password: schema.password, // 密码
        password1: schema.password1, // 确认密码
        agree: schema.isAgree, // 是否同意
      }
    };
  },
  components:{
    Form, Field
  },
  methods: {
    checkform(){
      return false;
    },
    // 获取验证码
    async getCode() {
      try {
        const { form:{phone} } = this; // 简单判断一下----至少有数据
        phone && (await this.$store.dispatch("getCode", phone));
        // 直接把验证码放到输入框
        this.form.code = this.$store.state.user.code;
      } catch (error) {
        console.log(error);
      }
    },
    // 用户注册
    async userRegister() {
      const {valid} = await this.$refs.target.validate();
      if(valid){
        const {phone,code,password} = this.form;
        try {
          await this.$store.dispatch("userRegister",{phone,code,password});
          this.$router.push("/login");
        } catch (error) {
          alert(error.message);
        }
      }
      
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>