<template>
  <div class="Trade">
    <el-dialog :visible.sync="receiveAllModel" :append-to-body="true">
      <div class="depositModel model flex">
        <div class="depositContent golBor">
          <div class="close" @click="receiveAllModel = false">
            <img src="../../assets/model_close.png" alt />
          </div>
          <p class="tips flex">{{$t('HarvestWithdraw')}} {{mToUpperCase(xCoin)}}</p>
          <div class="balance">{{stakeBalance}} {{mToUpperCase(xCoin)}}</div>
          <div class="balance">{{hdtBalance}} HDT</div>
          <div class="btnWarp">
            <el-button
              class="btn active flex"
              :loading="loading.receiveAll"
              @click="receiveAllEnter"
            >{{$t('HarvestWithdraw')}}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="receiveModel" :append-to-body="true">
      <div class="depositModel model flex">
        <div class="depositContent golBor">
          <div class="close" @click="receiveCloseBtn">
            <img src="../../assets/model_close.png" alt />
          </div>
          <p class="tips flex">{{$t('HarvestHDT')}}</p>
          <div class="balance">{{hdtBalance}}</div>
          <div class="number flex d_n">
            <input type="text" v-model="receiveHdtInput" disabled />
          </div>
          <div class="btnWarp">
            <el-button
              class="btn active flex"
              :loading="loading.receive"
              @click="receiveHDTEnter"
            >{{$t('get')}}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="depositModel" :append-to-body="true">
      <div class="depositModel model flex">
        <div class="depositContent golBor">
          <div class="close" @click="depositCloseBtn">
            <img src="../../assets/model_close.png" alt />
          </div>
          <p
            class="tips active flex"
            v-if="depositModelType === 0"
          >{{$t('Deposit2')}} {{mToUpperCase(xCoin)}}</p>
          <div class="balance" v-if="depositModelType === 0">{{coinBalance}}</div>

          <p
            class="tips active flex"
            v-if="depositModelType === 1"
          >{{$t('withdraw')}} {{mToUpperCase(xCoin)}}</p>
          <div class="balance" v-if="depositModelType === 1">{{stakeBalance}}</div>

          <div class="number flex">
            <el-form :model="depositForm" :rules="rules" ref="depositForm">
              <el-form-item prop="number">
                <el-input class="inputNumber" v-model="depositForm.number" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="ratio flex">
            <div @click="depositRatio(.25)">25%</div>
            <div @click="depositRatio(.5)">50%</div>
            <div @click="depositRatio(.75)">75%</div>
            <div @click="depositRatio(1)">100%</div>
          </div>
          <div class="btnWarp">
            <div class="btn flex" @click="depositCloseBtn">{{$t('cancel')}}</div>
            <el-button
              class="btn active flex"
              v-if="depositModelType === 0"
              :loading="loading.deposit"
              @click="depositEnter"
            >{{$t('Deposit2')}}</el-button>
            <el-button
              class="btn active flex"
              v-if="depositModelType === 1"
              :loading="loading.withdraw"
              @click="receiveEnter"
            >{{$t('withdraw')}}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <div class="header flex">
      <el-row :gutter="20" class="subContent">
          <el-col :span="16">
            <div class="middle flex">
              <div class="timeDownWrap">
                <div class="time-left flex">
                  <TimeDown />
                  <p class="stage" v-if="stake.status === 0">{{$t('comingSoon')}}</p>
                  <p class="stage" v-if="stake.status === 1">{{$t('countdown1')}}</p>
                  <p class="stage" v-if="stake.status === 2">{{$t('countdown2')}}</p>
                </div>
                <div class="time-right">
                  <img  src="../../assets/icon-time-bg.png" />
                </div>
                
              </div>
              <p class="notice">
                <el-carousel direction="vertical" :autoplay="true" :interval="3000" :loop="true">
                  <el-carousel-item v-for="(item,i) in newsList" :key="i">
                    <a class="medium" :href="item.link" target="_black">
                      <img class="speaker" src="../../assets/speaker.png" />
                      <p style="line-height: 24px;">{{item.content}}</p>
                    </a>
                  </el-carousel-item>
                </el-carousel>
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="subContentRight">
              
              <div class="subContentRight-my">
                <div @click="myWalletBtn">
                  <img class="icon-hd-right" src="../../assets/icon-hd.png" />
                  <div class="my-wrap">
                    <div class="my-title">{{hdtBalance}}</div>
                    <div class="my-des">{{$t('Mywallet')}}</div>
                  </div>
                </div>
                
              </div>
              <div class="subContentRight-rules">
                <a target="_blank" :href="linkUrl">{{$t('miningrules')}}</a>  <img class="icon-hd-right" src="../../assets/icon-rules-bg.png" />
              </div>
            </div>
          </el-col>
      </el-row>
    </div>
    <div class="mobile-index-top">
      <div class="timeDownWrap">
        <div class="time-left flex">
          <TimeDown />
          <p class="stage" v-if="stake.status === 0">{{$t('comingSoon')}}</p>
          <p class="stage" v-if="stake.status === 1">{{$t('countdown1')}}</p>
          <p class="stage" v-if="stake.status === 2">{{$t('countdown2')}}</p>
        </div>
        <div class="time-right">
          <img  src="../../assets/icon-time-bg.png" />
        </div>
      </div>
      <el-row :gutter="20" class="mobileSubContent">
        <el-col :span="14">
          <div
            class="minWalletBtn flex"
            @click="changeMetaMask"
            v-if="this.address && this.address.length>0"
          >
            <p>• {{hiddenAddress(this.address)}}</p>
          </div>
          <div class="minWalletBtn flex" @click="changeMetaMask" v-else>
            <p>{{$t('connectWallet')}}</p>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="subContentRight-rules">
            <a target="_blank" :href="linkUrl">{{$t('miningrules')}}</a> <img class="icon-hd-right" src="../../assets/icon-rules-bg.png" />
          </div>
        </el-col>
      </el-row>
      <p class="notice">
            <el-carousel direction="vertical" :autoplay="true" :interval="3000" :loop="true">
              <el-carousel-item v-for="(item,i) in newsList" :key="i">
                <a class="medium" :href="item.link" target="_black">
                  <img class="speaker" src="../../assets/speaker.png" />
                  <p style="line-height: 24px;">{{item.content}}</p>
                </a>
              </el-carousel-item>
            </el-carousel>
          </p>
    </div>
    <div class="coinHeader flex">
      <div class="golfFarm flex">
        <img :src="coin_img" alt />
        <p>{{mToUpperCase(xCoin)}}</p>
      </div>
      <p class="tips" v-if="[0,1,2].indexOf(coinListX.status) > -1">{{$t('EarnCoin')}}</p>
      <p class="tips" v-if="[3].indexOf(coinListX.status) > -1">{{$t('closePool')}}</p>
      
    </div>
    <div class="list flex">
      <div class="item golBor flex rainbow">
        <div class="coin flex">
          <img src="../../assets/icon-hd.png" />
          <p>HDT</p>
        </div>
        <div class="tips flex">
          <p class="total">{{hdtBalance}}</p>
          <p>{{$t('harvest')}}</p>
        </div>
        <div class="btn flex" v-if="!address" @click="changeMetaMask">{{$t('connectWallet')}}</div>
        <div
          :class="(hdtBalance === '...' || hdtBalance === 0) ? 'btn flex disable': 'btn flex'"
          v-if="address"
          @click="receiveBtn"
        >{{$t('get')}}</div>
      </div>
      <div class="item golBor flex">
        <div class="coin flex">
          <img :src="coin_img" />
          <p>{{mToUpperCase(xCoin)}}</p>
        </div>
        <div class="tips flex">
          <p class="total">{{stakeBalance}}</p>
          <p>{{mToUpperCase(xCoin)}} {{$t('Mining')}}</p>
        </div>
        <div class="btn flex" v-if="!address" @click="changeMetaMask">{{$t('connectWallet')}}</div>
        <div class="btnWrap flex" v-if="address">
          <el-button
            class="btn btni anbtni flex"
            @click="depositAuth(0,1)"
            v-if="allowance === 0 && parseFloat(stakeBalance) === 0"
            :loading="loading.auth"
          >{{$t('WalletAuthorization')}}</el-button>
          <el-button
            class="withdraw btn btni flex"
            @click="depositBtn(1)"
            v-if="allowance !== 0 || parseFloat(stakeBalance) > 0"
            :loading="loading.withdraw"
          >{{$t('withdraw')}}</el-button>
          <el-button
            :class="isOpen ? 'btn btni flex' : 'btn btni flex disable'"
            @click="depositBtn(0)"
            v-if="(allowance !== 0 || parseFloat(stakeBalance) > 0) && coinListX.status !== 3"
            :loading="loading.deposit"
          >{{$t('Deposit2')}}</el-button>
        </div>
      </div>
    </div>
    <div class="coinFooter flex">
      <div
        class="btn flex"
        @click="receiveAllModel = true"
      >{{$t('HarvestWithdraw')}} {{mToUpperCase(xCoin)}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TimeDown from '@/components/timeDown';
import errorHandler from '@/utils/errorHandler';
import { hiddenAddress } from '@/utils/index';
import BigNumber from 'bignumber.js';
import { isH5, keepDecimalsDown, mToUpperCase, numToString } from '@/utils/index';
export default {
  components: {
    TimeDown
  },
  data () {
    const validateNumber = (rule, value, callback) => {
      let numReg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,8})?$/;

      if (value === '') {
        callback(new Error(this.$t('CannotEmpty')));
        return;
      }
      if ((value + '').split('.').length > 2) {
        callback(new Error(this.$t('ErrorBalance')));
        return;
      }
      if ((value + '').indexOf('.') > -1 && (value + '').split('.')[1] === '') {
        callback(new Error(this.$t('ErrorBalance')));
        return;
      }
      if (value == 0) {
        callback(new Error(this.$t('insufficientBalance')));
        return;
      }
      if (!numReg.test(value)) {
        callback(new Error(this.$t('ErrorBalance')));
        return;
      }
      if (this.depositModelType === 0 && value > this.coinBalance) {
        this.depositForm.number = this.coinBalance;
        return;
      }
      if (this.depositModelType === 1 && value > this.stakeBalance) {
        this.depositForm.number = this.stakeBalance;
        return;
      }

      callback();
    };
    return {
      hdtBalance: '...',
      coinBalance: '...',
      coinBalanceStr: 0,
      stakeBalance: '...',
      receiveHdtInput: '',
      allowance: 0,
      depositModelType: 1,
      depositModel: false,
      receiveModel: false,
      receiveAllModel: false,
      precision: 0,
      decimals: 0,
      coin_img: '',
      coinListCallBack: false,
      hiddenAddress: hiddenAddress,
      isOpen: true,
      depositForm: {
        number: ''
      },
      rules: {
        number: [{ validator: validateNumber, trigger: 'blur' }]
      },
      coinListX: '',
      mToUpperCase: mToUpperCase,
      numToString: numToString,
      loading: {
        auth: false,
        deposit: false,
        withdraw: false,
        receive: false,
        receiveAll: false
      }
    }
  },
  computed: {
    ...mapState(['network', 'lang', 'address', 'stake', 'xCoin', 'coinList', 'reloadTime']),
    linkUrl () {
      let url = ''
      if(this.$i18n.locale == 'zh-CN'){
        url =  'https://docs.qq.com/doc/DYk1tRWViQUFReHFU'
      } else if( this.$i18n.locale == 'en-US') {
        url = 'https://drive.google.com/file/d/1-d8dtKeLbtftn675UTOiT-EQb1YA7WQn/view?usp=sharing';
      } else if( this.$i18n.locale == 'ko-KR') {
        url = 'https://drive.google.com/file/d/1wJVHt1Vw7B3V3vmVGl4MPGwvoZ3mPyh9/view?usp=sharing';
      }
      return url;
    },
    newsList() {
      return [
        {
          content: this.$t('newsList1'),
          link: this.linkUrl,
        }
      ]
    }
  },
  watch: {
    address (e) {
      if (!e) {
        this.stakeBalance = '...';
        this.coinBalance = '...';
        this.hdtBalance = '...';
      }
    },
    coinList () {
      // Only once
      if (this.address && !this.coinListCallBack) {
        this.coinListCallBack = true;
        this.getBalanceAll()
      }
      let coinListX = this.coinList.filter(e => (e.name === this.xCoin));
      this.coinListX = coinListX.length > 0 ? coinListX[0] : '';
    },
    reloadTime () {
      if (this.coinList.length > 0 && this.address) {
        this.getBalanceAll()
      }
    }
  },
  created () {
    let coin = this.$route.query.coin;
    if (coin.length < 6 && ['gxc', 'usdt', 'weth', 'ht', 'bnb', 'gof'].indexOf(coin.toLowerCase()) > -1) {
      this.$store.commit('updateSelectCoin', coin.toLowerCase());
    } else {
      this.$message.error('Unsupported!');
      setTimeout(e => {
        this.$router.push('/farm')
      }, 3000)
      return;
    }

    if (this.coinList.length > 0 && this.address) {
      this.getBalanceAll()
    }
    if (isH5()) {
      this.changeMetaMask();
    }
  },
  mounted () {
      this.$store.commit('updateRouterLoading', false);
  },
  methods: {
    ...mapActions(['getEthereumAddress']),
    getBalanceAll () {
      let precision = this.coinList.filter(e => (e.name === this.xCoin))[0].precision;
      let decimals = this.coinList.filter(e => (e.name === this.xCoin))[0].decimals;
      this.coin_img = this.coinList.filter(e => (e.name === this.xCoin))[0].img;
      this.isOpen = this.coinList.filter(e => (e.name === this.xCoin))[0].isOpen;
      this.precision = precision;
      if (decimals) {
        this.decimals = eval(`1e${decimals}`);
        this.getBalance()
      }
    },
    depositRatio (e) {
      if (this.depositModelType === 0) {
        this.depositForm.number = this.coinBalance * e;
      } else if (this.depositModelType === 1) {
        this.depositForm.number = this.stakeBalance * e;
      }
      this.$refs.depositForm.validateField('number');
    },
    receiveRatio (e) {
      this.receiveHdtInput = this.hdtBalance * e;
    },
    depositEnter () {
      this.$refs.depositForm.validate((valid) => {
        if (valid) {
          this.depositAuth(0, this.depositForm.number);
        } else {
          return false;
        }
      });
    },
    receiveEnter () {
      this.$refs.depositForm.validate((valid) => {
        if (valid) {
          this.depositAuth(1, this.depositForm.number);
        } else {
          return false;
        }
      });
    },
    receiveHDTEnter () {
      if (this.receiveHdtInput && this.receiveHdtInput !== 0) {
        this.depositAuth(2, this.receiveHdtInput);
      }
    },
    receiveAllEnter () {
      this.depositSend(3, new BigNumber(this.receiveHdtInput));
    },
    depositAuth (type, input) {

      let amount = type !== 2 ? input * this.decimals : input * 1e18;
      amount = this.numToString(new BigNumber(amount));

      if ([1, 2].indexOf(type) > -1) {
        this.depositSend(type, amount);
        return;
      }
      if (this.allowance >= input) {
        this.depositSend(type, amount);
        return
      }
      if (this.coinBalance === '...') {
        errorHandler({ code: 50009 })
        return;
      }
      this.$message({
        message: this.$t('authorizing'),
        type: 'warning'
      });
      this.loading.auth = true;
      this.contractSend[this.xCoin].erc20.methods.approve(this.contract.address[this.xCoin].pool, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({ from: this.address, gas: 80000 }).then(result => {
        this.$message({
          message: this.$t('authorizationSuccess'),
          type: 'success'
        });
        this.loading.auth = false;
        this.getBalance();
        if (this.depositModelType === 0 && this.depositModel) {
          this.depositSend(0, amount);
          return;
        }
        this.depositModelType = 0;
        this.depositModel = true;
      }).catch(err => {
        errorHandler(err);
        this.loading.auth = false;
      });
    },
    depositSend (type, amount) {
      switch (type) {
        case 0:
          this.loading.deposit = true;
          this.contractSend[this.xCoin].pool.methods.stake(amount).send({ from: this.address, gas: 200000 }).then(result => {
            this.$message({
              message: 'Success',
              type: 'success'
            });
            this.loading.deposit = false;
            this.depositModel = false;
          }).catch(err => {
            errorHandler(err);
            this.loading.deposit = false;
            this.depositModel = false;
          });
          break;
        case 1:
          this.loading.withdraw = true;
          this.contractSend[this.xCoin].pool.methods.withdraw(amount).send({ from: this.address, gas: 200000 }).then(result => {
            this.$message({
              message: 'Success',
              type: 'success'
            });
            this.loading.withdraw = false
            this.depositModel = false;
          }).catch(err => {
            errorHandler(err);
            this.loading.withdraw = false
            this.depositModel = false;
          });
          break;
        case 2:
          this.loading.receive = true;
          this.contractSend[this.xCoin].pool.methods.getReward().send({ from: this.address, gas: 200000 }).then(result => {
            this.$message({
              message: 'Success',
              type: 'success'
            });
            this.loading.receive = false;
            this.receiveModel = false;
          }).catch(err => {
            errorHandler(err);
            this.loading.receive = false;
            this.receiveModel = false;
          });
          break;
        case 3:
          this.loading.receiveAll = true;
          this.contractSend[this.xCoin].pool.methods.exit().send({ from: this.address, gas: 400000 }).then(result => {
            this.$message({
              message: 'Success',
              type: 'success'
            });
            this.loading.receiveAll = false
            this.receiveAllModel = false;
          }).catch(err => {
            errorHandler(err);
            this.loading.receiveAll = false
            this.receiveAllModel = false;
          });
          break;
      }
    },
    depositCloseBtn () {
      this.depositModel = false;
    },
    depositBtn (e) {
      this.depositForm.number = '';
      if (this.isOpen) {
        this.depositModelType = e;
        this.depositModel = true;
      }
    },
    receiveCloseBtn () {
      this.receiveModel = false;
    },
    receiveBtn () {
      this.depositForm.number = '';
      if (this.hdtBalance === '...' || this.hdtBalance === 0) {
        return;
      }
      this.receiveHdtInput = this.hdtBalance;
      this.receiveModel = true;
    },
    getBalance () {
      this.contract[this.xCoin].pool.methods.earned(this.address).call().then(result => {
        this.hdtBalance = keepDecimalsDown(new BigNumber(result).div(1e18), 4);
      }).catch(err => {
        errorHandler(err);
      });
      this.contract[this.xCoin].erc20.methods.balanceOf(this.address).call().then(result => {
        this.coinBalance = keepDecimalsDown(new BigNumber(result).div(this.decimals), 4);
        this.coinBalanceStr = result;
      }).catch(err => {
        errorHandler(err);
      });
      this.contract[this.xCoin].pool.methods.balanceOf(this.address).call().then(result => {
        this.stakeBalance = keepDecimalsDown(new BigNumber(result).div(this.decimals), 4);
      }).catch(err => {
        errorHandler(err);
      });
      this.contract[this.xCoin].erc20.methods.allowance(this.address, this.contract.address[this.xCoin].pool).call().then(result => {
        this.allowance = new BigNumber(result).div(this.decimals).toNumber();
      }).catch(err => {
        errorHandler(err);
      });
    },
    changeMetaMask () {
      this.getEthereumAddress()
    },
    myWalletBtn () {
      if (this.address && this.address.length > 0) {
        this.$store.commit('updateMyWalletModel', true);
      } else {
        this.changeMetaMask();
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./trade.less";
</style>
