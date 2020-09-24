<template>
  <div class="TimeDown">
      <div class="spar" >
          <div class="flex dateBg">{{stake.leftTime.day || '...'}}</div>
            <div class="flex dateMark">:</div>
            <div class="flex dateBg">{{stake.leftTime.hour || '...'}}</div>
            <div class="flex dateMark">:</div>
            <div class="flex dateBg">{{stake.leftTime.minutes || '...'}}</div>
            <div class="flex dateMark">:</div>
            <div class="flex dateBg">{{stake.leftTime.seconds || '...'}}</div>
        </div>
      </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState(['network', 'lang', 'stake']),
    },
    watch: {
        'stake.status' (e) {
            
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
   
    }
}
</script>

<style lang="less" scoped>
.TimeDown{
    width: 80%;
    max-width: 400px;
    font-family: Bebas-Regular;
    .spar{
        display: flex;
        color: #118B80;
        font-size: 36px;
        padding: 5px 35px;
        font-weight: 400;
        div{
            flex:1;
        }
    }
    .dateBg {
        background: url('../assets/icon-time-bgs.png') center center no-repeat;
        color: #E76E28;
        border-radius: 5px;
        line-height: 44px;
        flex: 2!important;
    }
    .dateMark {
        font-size: 14px;
        color: #fff;
    }
}

@media (max-width: 600px) {
    .TimeDown{
         width: 100%;
         .spar {
             padding: 5px 0 5px 20px;
         }
    }
}
</style>
