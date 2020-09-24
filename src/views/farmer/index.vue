<template>
  <div class="Farmer">
    <div class="header flex">
      
      <!-- <p class="disConnet" v-if="disConnet">{{$t('PleaseInstall')}}</p> -->
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
                  <div class="my-title">{{coinBalance}}</div>
                  <div class="my-des">{{$t('Mywallet')}}</div>
                </div>
              </div>
              
            </div>
            <div class="subContentRight-rules">
              <a target="_blank" :href="linkUrl">{{$t('miningrules')}}</a> <img class="icon-hd-right" src="../../assets/icon-rules-bg.png" />
            </div>
          </div>
        </el-col>
      </el-row>
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
      
    </div>

    <div class="list flex">
      <div
        :class="[0,1,2].indexOf(item.status) > -1 ? 'web-item golBor flex' : 'web-item golBor close flex'"
        v-for="(item,i) in coinList"
      >
        <img
          class="rank"
          v-if="item.status === 1 && i === 0 && item.usd !== 0"
          src="../../assets/icon-first.png"
        />
        <img
          class="rank"
          v-if="item.status === 1 && i === 1 && item.usd !== 0"
          src="../../assets/icon-second.png"
        />
        <img
          class="rank"
          v-if="item.status === 1 && i === 2 && item.usd !== 0"
          src="../../assets/icon-third.png"
        />

        <div class="coin flex">
          <div class="coin_img">
              <img :src="item.img" />
          </div>
          <p>{{mToUpperCase(item.name)}}</p>
        </div>

        <div class="tips" v-if="[0].indexOf(item.status) > -1">
          <p class="obtain">{{$t('Provide',{x: mToUpperCase(item.name)})}}</p>
        </div>
        <div class="tips flex" v-if="[1,2].indexOf(item.status) > -1">
          <p class>{{$t('Mining')}}</p>
          <p class="total" v-if="item.total !== '...'">{{item.total.toFixed(2)}}</p>
          <p
            class="usd"
            v-if="[1,2].indexOf(item.status) > -1 && item.usd"
          >≈{{item.totalBalance.toFixed(2)}} USD</p>
          <!-- <p class="rate" v-if="[1,2].indexOf(item.status) > -1 && item.rate !== ''">
            {{$t('annualization')}}：
            <span>{{item.rate.toFixed(2)}} %</span>
          </p> -->
        </div>
        <div class="tips" v-if="[3].indexOf(item.status) > -1">
          <p class="obtain">{{$t('closePool')}}</p>
        </div>

        <div
          class="btn flex disable"
          v-if="item.status === 0 || !address"
          @click="goFarm(item)"
        >{{$t('Deposit')}}</div>

        <div
          class="btn flex"
          v-if="[1,2].indexOf(item.status) > -1 && address"
          @click="goFarm(item)"
        >{{$t('Deposit')}}</div>

        <div
          class="btn flex"
          v-if="item.status === 3 && address"
          @click="goFarm(item)"
        >{{$t('HarvestWithdraw')}}</div>
      </div>
      <div
        :class="[0,1,2].indexOf(item.status) > -1 ? 'm-item golBor' : 'm-item golBor close'"
        v-for="(item,i) in coinList"
      >
        <img
          class="rank rank1"
          v-if="item.status === 1 && i === 0 && item.usd !== 0"
          src="../../assets/icon-first.png"
        />
        <img
          class="rank"
          v-if="item.status === 1 && i === 1 && item.usd !== 0"
          src="../../assets/icon-second.png"
        />
        <img
          class="rank"
          v-if="item.status === 1 && i === 2 && item.usd !== 0"
          src="../../assets/icon-third.png"
        />

        <div class="left">
          <div class="coin">
            <div class="coin_img"><img :src="item.img" /></div>
            <p>{{mToUpperCase(item.name)}}</p>
            <p v-if="[1,2].indexOf(item.status) > -1">{{$t('Mining')}}</p>
          </div>
          <div class="tips">
            <p
              class="obtain obtain0"
              v-if="[0].indexOf(item.status) > -1"
            >{{$t('Provide',{x: mToUpperCase(item.name)})}}</p>
            <p class="total" v-if="item.total !== '...' && [1,2].indexOf(item.status) > -1">
              {{item.total.toFixed(2)}}
              <span
                class="usd"
                v-if="[1,2].indexOf(item.status) > -1 && item.usd"
              >≈{{item.totalBalance.toFixed(2)}} USD</span>
            </p>

            <!-- <p class="rate" v-if="[1,2].indexOf(item.status) > -1 && item.rate !== ''">
              {{$t('annualization')}}：
              <span>{{item.rate.toFixed(2)}} %</span>
            </p> -->
            <p class="obtain" v-if="[3].indexOf(item.status) > -1">{{$t('closePool')}}</p>
          </div>
        </div>
        <div class="right flex">
          <div
            class="btn flex disable"
            v-if="item.status === 0 || !address"
            @click="goFarm(item)"
          >{{$t('Deposit2')}}</div>

          <div
            class="btn flex"
            v-if="[1,2].indexOf(item.status) > -1 && address"
            @click="goFarm(item)"
          >{{$t('Deposit2')}}</div>

          <div
            class="btn flex"
            v-if="item.status === 3 && address"
            @click="goFarm(item)"
          >{{$t('withdraw')}}</div>
        </div>
      </div>
    </div>
    <div class="more flex" v-if="stake.status === 1">{{$t('StagePhase')}}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import erc from '@/utils/json/ERC20.json';
import { toNonExponential, leftTime, mToUpperCase, keepDecimalsDown } from '@/utils/index';
import TimeDown from '@/components/timeDown';
import { hiddenAddress } from '@/utils/index';
import { address } from '@/utils/common'
import BigNumber from 'bignumber.js';
export default {
  components: {
    TimeDown
  },
  data () {
    return {
      coinBalance: '...',
      status: 0,
      isOpen: false,
      
      hiddenAddress: hiddenAddress,
      mToUpperCase: mToUpperCase
    }
  },
  computed: {
    ...mapState(['network', 'lang', 'address', 'stake', 'coinList', 'reloadTime', 'disConnet']),
    toFixed (e, o) {
      return ((e, o) => {
        if (!e || e === '...') return '...';
        return toNonExponential(e / o);
      })
    },
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
    network (e) {

    },
    address () {
      if (this.address && this.address.length > 0) {
        this.getBalance();
      }
    }
  },
  mounted () {
      this.$store.commit('updateRouterLoading', false);
      if (this.address && this.address.length > 0) {
        this.getBalance();
      }
  },
  methods: {
    ...mapActions(['getEthereumAddress']),
    goFarm (e) {
      if (!this.address || this.address.length === 0) {
        this.$message({
          message: this.$t('PleaseConnect'),
          type: 'warning'
        });
        return;
      }
      if (e.status === 0) {
        this.$message({
          message: this.$t('activityNoStart'),
          type: 'warning'
        });
        return;
      }
      this.$store.commit('updateSelectCoin', e.name);
      this.$router.push('/trade?coin=' + e.name);
    },
    changeMetaMask () {
      console.log('sss')
      this.getEthereumAddress();
    },
    getBalance () {
      setTimeout(() => {
        this.contract.token.methods.balanceOf(this.address).call().then(result => {
          this.coinBalance = keepDecimalsDown(new BigNumber(result).div(1e18));
        }).catch(err => {
          errorHandler(err);
        });
      }, 1000)
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
@import "./index.less";
</style>
