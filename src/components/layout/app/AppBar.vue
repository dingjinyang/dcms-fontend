<template>
  <v-app-bar app color="blue darken-3" dark>
    <v-app-bar-nav-icon @click.stop="navIconClick">
      <svg-icon name="menu" />
    </v-app-bar-nav-icon>
    <v-toolbar-title class="ml-0 pl-4">
      <span class="hidden-xs-only">学科竞赛管理系统</span>
    </v-toolbar-title>
    <v-spacer />

    <screen-full />
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account-details</v-icon>
        </v-btn>
      </template>
      <span>
        {{ $store.getters["user/info"].roles[0] }} :
        {{ $store.getters["user/info"].id }}</span
      >
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon @click="logout" v-on="on">
          <svg-icon name="power" />
        </v-btn>
      </template>
      <span>退出登陆</span>
    </v-tooltip>

    <v-menu
      transition="slide-y-transition"
      close-on-content-click
      offset-y
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn icon large color="primary" dark v-on="on">
          <v-avatar size="32px" item>
            <v-img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABjCSURBVHgB7Z3tlRvHsYbf5dF/Uw7AbDoAS3IA1lABWLQDMFcKwKIUgAneAEwyAS3lAEzqBkBADkAiA7jCKAGRSkDvndqeIYZrYBdV1dPzsf2c08ZaBNCYma6uj66uPkFhEEjebF6kfdi+hqbdav/u/j96/38fby40oW7aT0173bRX8t9PTk5eojAIJyi4aYQhNC8VojDcal8D8iJCIkL0Xft3XQTHTxEQJa1mEAH4AFEopN3ENBGBESF53rRXjcBsUFBRBOQIWg3xadPuYmcyzZFOYJ427btGYGoULqUIyAEaoaial4+bdor85lIO2LSHjZA8ROEgRUB6tJriHpYrFBcRIflj8VUO8x6uOa1PUTXti/b1uiFBhSIgB7i2AtIKhgjFfczXp0jBKxQOcu0EpPUtRDDuovC0OOqXc20EpBWMB7ieZtQ+xP/4FwqXsngnvQjGQbaN9vg9CpeyWA3SRqTOUATjEC7t0dxfeTlF1ERlTWUuiPPdtEcsXMavjBOI9R6fNG3d+75t0+5jgSzKxGoekjjfK0wrKlX32k/ta/ff+0mIhwjtq1yThGTfR0xz6SdCalk3M/4nMMCoOe407cWef9427cvmu7/FQliEidU8NBkojzCuOdWlcbxqX7uEwasE4CrqQ//QDtZ+btht7HLEDn6sad/Ajkyq9w78m/T/vPldTxFX6WsUxoPRnHrAcXjdtGeitVoBnQwiOE2r2t+27v3mn+kwhdrvvc3j+LFp91AYBxmUTfuBeZH+VoyRsdnAOLAD4+Ko93s+o44XdPg7BQOMM2MuOqEIuOYwOueWSalokxwwzoJrDo+YT485M00xJIza4yP6+JpOLVY4AKNN/ZrDsmbUTuUhXoBRezylH9EmAYV0cHhHfM2iLS6FdvNqH7IOs8h1k6wwRqmecTjWLIJxFIwCsmVa/omCDUZ/Y8thWLMIhgpGAXnM9HzPYnLpYAzhbpmeNYtgmGB00t8f6LkUv+RYmht1j+md8S1LmDEJjIJyn+kFRRYxKxQOw2GccTELSlQqIdwtPKaIavUR571MZPtgeuGQiEuFwmAwCspfmFabiJA8QGEH0wvHCoUsMAqJRBtTOvBFSDqYVji2nFji4HWBUVDuMJ02mYSQjLofpL0BK6ThiXxXgvTy5DBGaLq0dPl7XxHrfewrWl13bWrp5Izp9wHxmabwJa5vcTum0xwS8ZrMqiyj83rKaHKsOWx6zOu2D+nrHieiPRm1yYppuH7mFtMJx5YjDwpG+1sE4ozDLWxq2DL+lnsccW2Bu+TGLf1cHyFhulT1NUcK3zIKxcXNSFNlzZGEhbsNVilyuJYfAm4u8C7T8BgjwJhRvOZ8WXOEQcZ0aSoiJBWWCKNtnsIeXyEj3G3rHTrVPidbRjMsIBNM55f8zKWlpTBd4mE2Z5wxHyz1SvEUOWOmAcd0QrKs3C2mEY5TZID5di1OjTNmGHS07Wvfh2QBzz+FiP4ibmLaVBgYRlPqOmiMqzjjwILCdEIy7/0k9IdzRTgGDeNymT5GCmRiCxgIphGS+e5MZDRVvFQYEMao1JaFQwxajYTphGRe6UVM45SfYiBY6vdqOeNA2oRphEQEeT7+CP22/GBqk0VrWBlMmzAKyZf08W8MQPJkRcYC0p6FPElOWyExjDOMpCuMZbNK0mGNWLP3F8RCz7/g3WLWHV0iY/d3v2h1aNtYM6YcKfFV6qRQxkTHFeIzMn0F4u8aZRH5KOhfDBzk4trfNUaZUlk9PmVi84RxxpV1mrttH7mvbZB1CPpX3Ke9iEif6fIDBoB5Cs6x7eOMUSCyzu7cbVoSgRHzdsvhcRXCvuRaLp49ouUFpgh9Id0th5mRHnBYugrvIoSTcRK5q+4+9LpO8jAr/dVTphf6pS+kK4MsIDEcNkolJs3kS5RyV1xBtNqWw/Bz6vvAXRawVfNPy9Sir/ph6hloyGqMa840m5Rx0N1l+jQambGTTxT0h3/XjI7/uDDOTlaSOuWMwjGEw7rmQtKsuTO/1kzD1xgI+pz2c1OLYwoJfQuCWySEw0Sqtlzo/gNGQfGaXoMu0HHnj1ifa3LzT3sBHjs/IBFMX8dXbN8VrgHcpaBr7f0sKef0+yMyRpEd+hzzFRLCtNGaNa9ZnVjqKyVm3Y9B30r7OLlatA/KpKZV+1tSMKnqKGPAXd3dy2brUTYr0bc+smZOLcLo5FkJSAz9DucPvGZa4xDcmTTbPfdJbPpRMmfpM7Xy7mWn3d5fYQDo80Gmm7szIvzvCJJojrFLLHlMrTVzaBHaw7rJTasLv0srJNfepLoK7lJYAiYC7UfB5dEitM/Ug88+PH6RcMtSw3eWcLeOY0G0IAaDdu1xhozw8soZWxZ/Y9bQfuKuaJFPNX2p9oMwmkkBem7nLrTMaD49uvCf66bdGavoM+OiVVfAWl5/g93+jou86TUpWi33/lXTXk6xQHdOGLWA7I/5Efp9MRvEMYCk0K7WVhgJ7mL7YnatmD8Nvavb+5hpFzLFBj9jzK2axVZT7kwjeQ5u85b2GlvD+CK0hVK3c3mAqeA4dXvXjPV3J3mv+d+D2T1IuUtDsYR910zpi9C+an5tzpvjbv/FmOWDuk1bAROBu8XHi7jzuC757qtIq0Voc4gGDetOBU63oPWaIydacpcQeQh3JjCjw76lHjG74YZFe+yF86n0fsbxjj746IrflsrUskRX0+xjMXa+WO3B+dbUGrRS4oV7pEkLSWFqndBm2q7ghTb1tUjtwRg1mnOJ0kErJbb36LJcrkOs4ID2iJbklsEMbaHdLRPMVIyRoBUn4HAyao0zLofBij7Ttojn2kNOe0TLZ+LR5py7V835rgkjF30XI8FYf2rL5TFkbast9azpmM1p1yIvTP0yzpoWAhzwcFAg+yGOjGsLS676LkJSISG0C4hrNudOi2ixbculzTl/Die8XGs9QiY4fE2tqZC0jhR9p0it6dMilk1VtuunLYRZwQGP83kG39zE6yMcHcmOWaZvhTuFFrH4zQfNrJMDHQXE5DgN9cnJyW04aPp91rwc42/UGCjpsB0oKwxLjZg091P7d5eUKH/3C1eHtnVFq4dM0ZcRIoXDH8JJO9g+a5plIXADRzJh07d88GfokhjlB//26CRQ2swr18486hck10gMh9McSer2cvj6uyk1iXUPeQotojXxdGaW8cICHNAWMQtIBIcRjjUHqtvL3QrymmmRweJeK+FxK+mHWNPoi3C3DqPluGgWbdEr12xOezpLhQQwzsopWTNTHhT1JXuOIUkyH+2VEb1axOqsXz2R0TZYXDMO7Q/XPTPTf6ZJnzVHShDkbuZMVV3SXQCaPoddBAsWaMvyFQE5PebLs5s6tNnTKRYkbzKNLT+ZAhBMU1K043s4oS8NxDQB0r4mcvWYov7Ges0rS0BACHDCNEmHa04gHaYP02oTV1oKfWkg5kmHNjPr8twsxrQKLa6ZkzYnM4X2sApmn0nX1KJv0a4jVUq65Xes6TOzLNGsDy/7UsvuLHNsnnbnPMAB0xS7nkVNLaYREldKOu0mj1k4aYuiXa61qD94xrXvg7ZZPIX2eEofp5gRTHMWudfUspbqWcEIbXlhzy/7wi11uAYrbTZyBQf0VaUXTjFD6BeSy82P4/qvqMdc7I22MPN+P4Q2/0NVhOtCf5aB6t6pSJ9pNetSpfTVthVcJ8jSvj5RwQBt23Glv9B9x43e9wXoeQU7lj0eKzhgnP0DbDyc9CH1R9DmN0lGtDXfqqJPg8vU/C10yI+uYEfbH/b2R70qcp1rznHSWba08QwLgr6zNsxahHZn3bapCWY/5O1E2NcgH0DHSxhhjIhU0LHxZO/Srj3qpn2JZSGj7a+I16bFrEVaDSYZsxvoqKAvMdrnO+j4U/fHjQs/QsMGdiroeQof1nSY1Vi1fIeiHaivm/Y59MiH/wE7IpzfQI9127X0t4GO0Gms986/wRad8PgfFfRoZ4G3tNdXQc/TZjBZHuZRtDOxaO6uoHVo/6lGnGnlHovm3CAxIiRN/xvEwaqdPESLfNh8h9WKsPghH8M+SWrHqmirgE7D0pCgCAfUh3e96SyW+PuWwxQ1kGih+Hua1IstBygAx/GSCS0+kDfcq7nGt4mLnYml1SAbGOHuCAANlkhEH0s4+puUphXblPTmTwlufAGdTR2adtq0LRMKSs/UegI9f4PdL7BEswJ8fkiteO9J299bAdE66B7zymLOeQICp9DfWNk+vEIimt8gAiGCkaJo22nTZDZNuSYjAnLcdtMdlomuj8Vk/hh2tGP2lvxPJyABOmrYqaDjjdMGt2iPFRLBmG0gYcOUuwplhpNM5H/SuSfGoUXkg/csZk/bp0x6GqGUD92BDUI/yZ4rDauAmGd0ZAwnt1TQIQ/NHBDoYNxrIlrjFMMh4ecXTLOl16JFZPLx9L2BjluwU0PHeSTrRntztRepvZHvdAwdnuhVBf21PU/ke0hgwWOCHMtHcApJb31CG7HzmFkyq2uf7Qe0x4cskaybokHUF2gN7xkd9A3s3IUei8P6DowF7nIIR4cIibferjUNxLo+IdTQEWDQWO0EUENPuGHo0GPyBOjx9Kd16mpHbP+c1iFP6UAfy6nHcW8H0Qb6gfQHx6xusQ4C7NTQceuGocOc5tUb64muY4ST2/DrCuNwvsLtDAFbVrkr2Gf1rmCeBo9mrqHjfYsGqWFHe3Ge2dxyI5/Dxwppo1Va5Ghkr6m1gR7PoNU847frE0Z+Urz3vC+LBtF0cpEpC6MrnNzO3FM4OOgufcmEYvbknNW14+l3sKO9rt+JgPxG9xmXiaUN8XqEMUCHN5y8wjSQUf53+NDO6trn2mFZn3gfNqSvGkokWTFniFeLZ8+J9qF5wskBPu2xQTTvulCk/HaJDlWwIcmEN63+W/s7KsX7rQIiaH+jZy3kF+gIuX2QAB3aC/L05RHGCjZqxErm0p6Iidc2CTXLqrF1z4Y801PYsMzqHr9LayV4+lKn01gExEOAjpwRM485Z0lnqRGFY7PvH1t/QHYyfgK9kMiH/wA72kW14Aj11tARYMckIEN34sEa4g3QU8NOBT1Xnm/SCokUqhAh0d6LCnZq6AnIhEMY1ePJokGyDVpHyof6mhzrLR8a+nt87LX1hES7wh8s6SeO9Qk1nhVu2Ji8iZWLnIEHy/2zpLNYPpPTXg9YHiYTa4nUsBOg46VWM/Zmda3znDO6tEimLCA15kGADk8wQOs8W9cMhMn7mjkoGiQ/r5EHb1pGToqAFApzpAjIsvHkLRVQBKRQuBQRkBoFDzV0eNJnCj7UaVUWDRJQ6CNJhsceyyAO+mMUxkK9LvQe9GjT4xeNrMA3K9aSCvIAl2eaSqTmf5ZW53fhvBEBqaHTCp7Y+iJpB/1nKEydAB1vxMSyVNQrFOaIduz+IgKi3kSCQmGeaAXktSWKVXyQwhyRzALNbkTJqf/JYmIFFArzRLtd941FgwQU5kJZc3mXAB21SUDoOz+nkI8iIO8SoOMX60p6QKEwE9oJ/UPoeXmj3Wpa/JDC0jFtw+5STWroqDFtAgpzImB4tErgfPdmJyCanWpnxnSJssCYF7bt2tM70Wqj+Ni5/3asBpEbLYl2D5v2FWwUAcmPZ3vv0pAxLOlAa1w9ebwtntcJyObAm7rs008aKfytHGzpKGdZ8JNzkTZgQYgWaS0fSSz9fdM+x+XCspH/ea/98Kbx9EU7/BnRVvsPBjrAfqLMJRxatHDEPEn3anE9bY/lDohF9j7FrkLmw+Z957Wa3+t9cIXpVCgXatgJ0OEupHDM2lD7cJaKetC298xS3C6JFdMXFkSBOf89/e+37AexErBA2psqd/qqCot1895tZiHxCH6u4nuT0Yq9+mNvySkgU8ZkYrXCcbtpX+PqWrjy5q+azzx2CIk6XRt2ijmHvEUbAnTUsBOgwzr7yUiXnYTVke/9B3wDb8qD1noPA3TUyMhSq5rkjPZoynvKAA+wM7jZ02rFACVLjW5OWYMs9ixE2MnlF+Qk57NSk1NAprzRKlc5UCFbtAfzMHsm7evkFJBFHfU2gikyWjj0CDz9aDcxZV2zWpyTbhy4uWbanEfK1bAToMMT5FDvE0dGsgiIw0SwYOmnRh5q2Mnpf+Sc1TXXdb5PHBnJpUFuIp+JFaDEYYoE6JiDgy6zurb2mWdWV+8TR0ZyCUiAkoznE9awE6Aj57HWnr40VeG9s3qJYmHag7aGDW0Zmbn0JeQ05wJ0LNJJ164V1LAToMNzw7V1lmrY0faV05yroaTnlxYNgryDVntwZQ07OR/ulBc/rc8rQEnu4t+5BEQ7aF/CzhIHkhCgQ+0XOKKN1uc1+cyARfkgxvIu6ofrKSMDJSOYIurrckQBB39WXgYXEONgqmHDMpByrWy/yTiQckYBrYPWcgpv9p2fOTRIlpnW2lczkHL1tVSz0WP2/AE6amQmh4AE6HgzA5Wde/bLpYHlurSDVlMy6iLaVfQamZmigHhm2gAduWa/t2VkDFgGbQ07QfFe76DVCr5HGE3kEBDtIKxhRxst89zwnCZWULzXu7IdoKOGEkeQY5FRrOfQYRq0xpu+Vr6/34/WL/AM2pyRuVzXFaDE4S+aGVxAWn/imeIjHqd5UQ/XMdPOYdBOPsQr5FoHkSp22yPfa70RAUpm8nADlMzguix+VdY0944sAtJqkT/iak3y0hHBqqDD83D/BB3Whyt9VdAxl0GrEUZPkMNFth2FMvCb9lfEAtiHyhB6brjWQf8BdrQPdwM7OQdtULzXNGh7mQEBOr7DCGQv+9OWOBWTa98mmw0MtDe90nwEhmCAw5H1zH6DC2Nv0OYysSx+VY0RGKUuViMkTxFNrot+ifWGV9BjnZEsq/XqvhzCaA1d5wwGVNDxJncWb8doheN6pei7EvRbRzV5dXqE0ZHN6RMIAXpyTTKee6j14UbxP4RRa/N2QtLMlnfhU6GfKt/vueHah2vVVBZhrI1BjtyDdvIr6B2TKF7dPNTnMGL0P6wmT4Dekd3AjnbQ5soM8NxDbca19x66WEJt3gp6rLN6BT3WYIDWafY46BZfRx0F7B0voK2CMpoGWYKA3IUeq+2sNeVqh3NpcZpzBjn+AxsikZ8DRx8wWo/loAuzFpB29vsYOjaOxUh1X7Cj7csULUMUfG1f5gXdVouISS3nBD5B1ESHzgmU//YNRmTuB+gE5LOdK+ht529hRzsAN7CjFhA46B19dr/n23VnBFa9tz5p3vsQBRvNzT2ljl+bpp6Zm8+cNO0JdUhfAQZk0DTtdtN+VPT3CErafu5Qh1zX3zAA7e8JTbvbNIuJWehob+aaOn6GAUYB2VLH93DQGyyrpr2Q394Ozl+5f9AGKGn7eEgdZsEvZKQdPFo0afddP9I+oh71jH7E76ia9kXT/s2dwMjrFzDAKPhr6vgRhelDm3mlNg3agfkldZhMOcPvCjDCnRmn5WsUpg1t5pXVDLGYV5OfZdt7+Bl1yD3UhrpnzVzDvAH62P1GG0/nbhEtQMcG08eyriOMtmg3BnMVkAo6ZKQ/hR4ZRPehQ/oyp87kgLuVeq2AbMZctBuD2QlI+3AfQI915VebDyVZrv+L6VNBh2kNae7MUYOYTB6jeVUZ+pq09mgRzWhJ0fEsfM6SOQqIxeR5Cj0yiE6hY07mlTaiV49Rdmds5iggt6BHZV5xl/5gGURzMK8s2mODa8gcBUSbo/St0bGsoGeD6SOaUSv4oycNFo6EMfVCE7f/M5TQtvYx+OKgF9oXB8vq+VxoHtZNHp/Ep36wtC2gmfrKjePayur5nGDMw1oP8WBpy08aLMM1JVyoZizsgXE2XHF/dmv3YIPhO7Xp36a+9vT7tg2B49qKeTVX2od+n/uF5AWUMM6w31CP2QRpr+F9xuTLO+3fJ21LJjBjXFthAnD/5iK1c067A2s2QdpBKwL++sJ3rpv2mHHj0G32BMbYj+faysalucPd5qJn7UNVp6LQPsOaNkZRt89k27Qz2ncoyrU9ph7Xpq/CQqBvhjU55+2gfU4darOx19eWOmYReChkgHbtYXJg6RBIKKE9tFu21hZcW2q92sMikNbAw5p6inNeeDuAfqAeCQoEKGFmc45286o459eddrD+hXpMgYC2z9zmnPT3TNdVcc47llB61Iv2ZCqhhiF5j7ssYe0mLE+yoHz2K8SzWI6JE8t7HqNwThEQfXbw+WA1ZghLJu092M79MAmIVDFsmgiHlPo85jBVSdn/FwoFgbs1gl+PNXXo8z221JPEYea7xegOFaAz1dgqLJh24Jy2g/8yQfH4HtpU/X6fAQnpCcpT7q5XXv+PJbRbOMQFQdmHOXGP9miZuhqk4jd1gvKoaX9vmvaMkMJ1hLvZvtMoXTMXTWNJNS8sid7s+kU7u7rWBXh55vEhTKklhcIs4dUmXNEehQLfNeGK9igULsL9kaSiPQqFPnsExXzeRyE9/w9NkRGo9DZ+wAAAAABJRU5ErkJggg=="
              alt="Vuetify"
            />
          </v-avatar>
        </v-btn>
      </template>
    </v-menu>
  </v-app-bar>
</template>

<script>
import SvgIcon from "../../svgIcon/SvgIcon";
import ScreenFull from "../screenFull/ScreenFull";

export default {
  name: "AppBar",
  data: () => ({}),
  methods: {
    navIconClick() {
      this.$store.commit("REVERSE_DRAWER");
    },
    logout() {
      this.$store.dispatch("user/FONT_LOGOUT").then(() => {
        // 刷新路由
        location.pathname =
          process.env.NODE_ENV === "production" ? "/dcms-fontend/" : "/";
      });
    }
  },
  components: {
    SvgIcon,
    ScreenFull
  }
};
</script>

<style scoped></style>
