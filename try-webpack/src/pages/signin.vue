<template>
  <div id="sign-main">
    <div class="login-wrap animated fadeIn">
      <h3>Auto Vue</h3>
      <p>{{$t('message.login.introduction')}}</p>
      <el-form ref="form" :model="form" :rules="rules" label-width="0px">
        <el-form-item prop="name">
          <el-input :placeholder="$t('message.login.name_holder')" v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :placeholder="$t('message.login.password_holder')" v-model="form.password" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-between">
            <el-checkbox v-model="isMemery" style="color:#eee">{{$t('message.login.remember')}}</el-checkbox>
            <a href @click.prevent="openMsg" style="color:#eee">{{$t('message.login.forget')}}</a>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Login('form')">{{$t('message.login.button')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push">
    </vue-particles>
  </div>
</template>
<script>
import router from "../router/index";
import generateRoutes from "../router/parse";
export default {
  name: 'signin',
  data() {
    return {
      form: {
        name: localStorage.userInfo || "admin",
        password: localStorage.passwordInfo || "654321"
      },
      isMemery: false,
      rules: {
        name: [
          {
            required: true,
            message: this.$t("message.login.name_tip"),
            trigger: "blur"
            // validator: checkone
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("message.login.password_tip"),
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    Login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("login", {
              username: this.form.name,
              password: this.form.password
            })
            .then(res => {
              localStorage.userName = res.data.userName;
              localStorage.userId = res.data.userId;
              localStorage.token = res.data.token;
              this.getMenu();
            });
        } else {
          return false;
        }
      });
    },
    getMenu() {
      this.$http.get("getMenu").then(res => {
        let menu = res.data.menu;
        localStorage.menu = JSON.stringify(menu);
        const _routes = generateRoutes(menu);
        router.addRoutes(_routes);
        this.$router.push("/hello");
      });
    },
    openMsg() {
      this.$message.warning(this.$t("m.login.info"));
    }
  },
  watch: {
    isMemery(n, o) {
      if (n) {
        localStorage.userInfo = this.form.name;
        localStorage.passwordInfo = this.form.password;
      } else {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("passwordInfo");
      }
    }
  }
}
</script>
<style lang="scss">
  #sign-main {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/imgs/bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    #particles-js {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  .login-wrap {
  width: 310px;
  padding: 30px;
  z-index: 3;
  margin-right: -40%;
  position: relative;
  background: rgba(50, 50, 50, 0.5);
  .el-form-item {
    margin-bottom: 25px !important;
  }
  h3 {
    text-align: center;
    color: #ebedef;
    margin-top: 0px;
    margin-bottom: 5px;
    font-size: 22px;
    span {
      color: #20a0ff;
    }
  }
  p {
    text-align: center;
    color:#fff;
    margin:0;
  }
  form {
    margin-top: 25px;
    .el-form-item {
      margin-bottom: 15px;
    }

  }
  a {
    text-decoration: none;
    color: #1f2d3d;
  }
  button {
    width: 100%;
    font-weight: 600;
    border:none;
    border-radius: 0;
    background-color: #34495e;
  }
}
</style>