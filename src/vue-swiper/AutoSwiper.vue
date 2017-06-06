<template>
  <div>
    <div>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in imgs" :style="{'cursor': 'pointer', 'height': height}" :key="index">
          <img :src="item.mCover" :alt="item.mTitle">
          <div class="text" data-swiper-parallax="-300">
            <div>
              <h1>{{item.mTitle}}</h1>
              <p>{{item.mDesc}}</p>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false
        }
      }
    },
    props: ['imgs', 'height']
  }
</script>

<style scoped>
  .swiper-wrapper > div{
    height: 450px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #000;
  }

  @keyframes img-change {
    from {
      transform:scale(1, 1);
      -ms-transform:scale(1, 1);
      -moz-transform:scale(1, 1);
      -webkit-transform:scale(1, 1);
      -o-transform:scale(1, 1);
    }
    to {
      transform:scale(1.2, 1.2);
      -ms-transform:scale(1.2, 1.2);
      -moz-transform:scale(1.2, 1.2);
      -webkit-transform:scale(1.2, 1.2);
      -o-transform:scale(1.2, 1.2);
    }
  }

  @-webkit-keyframes img-change {
    from {
      transform:scale(1, 1);
      -ms-transform:scale(1, 1);
      -moz-transform:scale(1, 1);
      -webkit-transform:scale(1, 1);
      -o-transform:scale(1, 1);
    }
    to {
      transform:scale(1.2, 1.2);
      -ms-transform:scale(1.2, 1.2);
      -moz-transform:scale(1.2, 1.2);
      -webkit-transform:scale(1.2, 1.2);
      -o-transform:scale(1.2, 1.2);
    }
  }

  @-moz-keyframes img-change {
    from {
      transform:scale(1, 1);
      -ms-transform:scale(1, 1);
      -moz-transform:scale(1, 1);
      -webkit-transform:scale(1, 1);
      -o-transform:scale(1, 1);
    }
    to {
      transform:scale(1.2, 1.2);
      -ms-transform:scale(1.2, 1.2);
      -moz-transform:scale(1.2, 1.2);
      -webkit-transform:scale(1.2, 1.2);
      -o-transform:scale(1.2, 1.2);
    }
  }

  @-o-keyframes img-change {
    from {
      transform:scale(1, 1);
      -ms-transform:scale(1, 1);
      -moz-transform:scale(1, 1);
      -webkit-transform:scale(1, 1);
      -o-transform:scale(1, 1);
    }
    to {
      transform:scale(1.2, 1.2);
      -ms-transform:scale(1.2, 1.2);
      -moz-transform:scale(1.2, 1.2);
      -webkit-transform:scale(1.2, 1.2);
      -o-transform:scale(1.2, 1.2);
    }
  }

  .swiper-slide > img {
    width: 100%;
    height: auto;
  }

  .swiper-slide > img:hover {
    animation: img-change 1s;
    animation-fill-mode: forwards;
  }

  .text {
    position: absolute;
    bottom: 0;
    height: 30%;
    width: 100%;
    color: white;
    opacity: 0.7;
    background-color: black;
  }

  .text > div {
    padding-top: 5px;
    text-align: left;
    padding-left: 20%;
  }

  .text > div > h1 {
    margin-bottom: 10px;
  }

  .swiper-button-prev {
    background-image: url("../assets/left-arrow.svg") !important;
  }

  .swiper-button-next {
    background-image: url("../assets/right-arrow.svg") !important;
  }

  @media screen and (min-width: 1500px){
    .swiper-wrapper > div{
      height: 900px;
    }
  }

</style>
