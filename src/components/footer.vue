<template>
  <div class="footer" :total="total">
    <div class="web_footer">
      <div class="c2020">
        <span>©</span> HUBDAO
      </div>
      <div class="icon flex">
        <img class="er_code" :src="er_code" v-if="er_code_show" />
        
        <a
          class="tokenContract flex"
          href="https://etherscan.io/token/0x1cc945Be7d0D2C852d0096A8b5714b44eD21D5D3"
          target="_black"
        >Token Contract</a>
        

        <ul class="footer_icon flex">
          <li v-for="item in iconList">
            <a class="flex" :href="item.link" target="_black">
              <img :src="item.img" alt />
            </a>
          </li>
          <li class="flex">
            <img
              src="../assets/icon_wechat.png"
              alt
              @mouseleave="er_code_show = false"
              @mouseover="er_code_show = true"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="m_footer">
      <div class="link">
        <a
          class="tokenContract flex"
          href="https://etherscan.io/token/0x1cc945Be7d0D2C852d0096A8b5714b44eD21D5D3"
          target="_black"
        >Token Contract</a>
        
      </div>

      <ul class="footer_icon flex">
        <li v-for="item in iconList">
          <a class="flex" :href="item.link" target="_black">
            <img :src="item.img" alt />
          </a>
        </li>
        <li class="flex">
          <img
            src="../assets/icon_wechat.png"
            alt
            @mouseleave="er_code_show = false"
            @mouseover="er_code_show = true"
          />
        </li>
      </ul>
      <div class="c2020">
        <span>©</span> HUBDAO
      </div>
    </div>
  </div>
</template>

<script>
import { sendEmail } from '@/service/CommonService';
import er_code from '../assets/er_code.png';
export default {
  props: ['total'],
  data () {
    return {
      er_code: er_code,
      er_code_show: false,
      iconList: [
        {
          img: require('../assets/icon_telegram.png'),
          link: 'https://t.me/hub_DAO_Community'
        },
        {
          img: require('../assets/icon_twitter.png'),
          link: 'https://twitter.com/hub_dao'
        },
        {
          img: require('../assets/icon_medium.png'),
          link: 'https://medium.com/@Hub_DAO'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.footer {
  .web_footer {
    width: 100%;
    height: 70px;
    background-color: #F37022;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .m_footer {
    display: none;
    background-color: #F37022;
    height: 180px;
  }
  .c2020 {
    width: 120px;
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
    span {
      color: #fff;
    }
  }
  .tokenContract {
    width: 136px;
    height: 40px;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 40px;
    flex-direction: row;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
      margin-top: 3px;
      margin-right: 2px;
    }
  }
  .tokenContract:hover {
    border: 1px solid #fff;
    color: #fff;
  }
  .uniswap {
    width: 196px;
  }
  .icon {
    width: 100%;
    max-width: 1440px;
    height: 100%;
    margin-left: 10px;
    flex-direction: row;
    justify-content: flex-end;

    .er_code {
      position: absolute;
      z-index: 10;
      right: 0;
      top: -120px;
    }
  }
  .footer_icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 10px;
    li {
      list-style: none;
      margin-right: 24px;
      img {
        width: 24px;
        height: 24px;
        margin-top: 9px;
      }
    }
    li:hover{
      img {
        opacity: 0.5;
      }
    }
  }
}
@media (max-width: 760px) {
  .web_footer {
    display: none !important;
  }
  .m_footer {
    display: block !important;
    .link {
      display: flex;
      a {
        flex: 1;
        margin: auto;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 16px;
      }
      a:nth-child(1) {
        margin-left: 20px;
        margin-right: 20px;
      }
      a:nth-child(2) {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
    .footer_icon {
      margin-top: 24px;
      li {
        margin-right: 24px;
      }
    }
  }
  .tokenContract {
    background: #ffa470;
    border: 1px solid #ffcdb0;
    border-radius: 4px;
  }
  .c2020 {
    margin-top: 10px;
    margin-left: 10px;
  }
  .footer {
    height: 180px;
    flex-direction: column;
  }
}
</style>
