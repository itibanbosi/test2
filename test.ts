enum eureka_IO {
    Aﾎﾟｰﾄ,
    Bﾎﾟｰﾄ,
    Cﾎﾟｰﾄ,
  }
  enum eureka_denki {
    Aﾎﾟｰﾄ,
    Bﾎﾟｰﾄ,
  }
  enum eureka_tlp {
    Aﾎﾟｰﾄ,
    Bﾎﾟｰﾄ,
  }
  enum eureka_p1416 {
    Aﾎﾟｰﾄ,
    Bﾎﾟｰﾄ,
  }
  enum onoff {
    ON,
    OFF,
  }
  
  enum moter_d {
    両方前,
    両方後,
    Ｌだけ前,
    Ｒだけ前,
    Ｌだけ後,
    Ｒだけ後,
    停止,
  }
  enum etc {
    AKARUSA,
    JINKAN,
  }
  enum L9110moter {
    seiten,
    gyakuten,
    seisi,
  }
  enum sonar_avg{
      平均20回,
      平均5回,
      生データ,
  }
  enum kyori{
      短い,
      長い,
  }
  
  let kousei_A=1;
  let kousei_B=1;
  let kousei_C=1;
  
  enum LED_onoff {
      しない=0,
      ゆっくり=2000,
      ふつう=800,
      はやく=300,
  }
  enum LED_color {
      赤,
      オレンジ,
      き,
      みどり,
      水,
      青,
      むらさき,
      白,
  }
  enum LED_wait {
      //% block="えらぶ",
      zero,
      //% block="0.2",
      dot_two,
      //% block="0.3",
      dot_three,
      //% block="0.5",
      dot_five,
      //% block="0.8",
      dot_eight,
      //% block="1",
      one,
      //% block="1.3",
      one_dot_three,
      //% block="1.5",
      one_dot_five,
      //% block="1.8",
      one_dot_eight,
      //% block="2",
      two,
      }
  
  
  //% color="#32cd32" weight=100 block="ふく合ﾕﾆｯﾄtest"
  
  namespace eureka_blocks {
  
      //% blockId=eureka_buz_set
      //% block=ﾕｰﾚｶIOﾎﾞｯｸｽで音をならす
      // group="1_初期設定"
      //% color="#ff3d03"
      //% weight=90
  
      export function eureka_buz_set() {
      pins.analogSetPitchPin(AnalogPin.P8);
    }
  
  
      //% color="#4741f1" weight=89 blockId=eureka_tl_blue block="青信号 点灯|%mode| |%pin|" group="2_信号機ユニット"
      export function eureka_tl_blue(mode: onoff, pin: eureka_tlp) {
      switch (pin) {
        case eureka_tlp.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P14, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P14, 0);
          }
        case eureka_tlp.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P16, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P16, 0);
          }
      }
    }
    //% color="#ffa800" weight=87 blockId=eureka_tl_yellow block="黄信号 点灯|%mode| |%pin|" group="2_信号機ユニット"
    export function eureka_tl_yellow(mode: onoff, pin: eureka_tlp) {
      switch (pin) {
        case eureka_tlp.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P13, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P13, 0);
          }
        case eureka_tlp.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P15, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P15, 0);
          }
      }
    }
    //% color="#ff4940" weight=85 blockId=eureka_tl_red block="赤信号 点灯|%mode| |%pin|" group="2_信号機ユニット"
    export function eureka_tl_red(mode: onoff, pin: eureka_tlp) {
      switch (pin) {
        case eureka_tlp.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P0, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P0, 0);
          }
        case eureka_tlp.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P1, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P1, 0);
          }
      }
    }
  
    //% color="#1E90FF" weight=83 block="待ち時間（秒）|%second|" group="2_信号機ユニット"
    //% second.min=0 second.max=10
    export function driveForwards(second: number): void {
      basic.pause(second * 1000);
    }
  
    //% color="#228b22"  weight=82 blockId=eureka_denkiLED block="光ｾﾝｻの値を表示する |%tlp|" group="3_電気の利用ユニット"
    export function eureka_denkiLED(tlp: eureka_tlp){
      switch (tlp) {
        case eureka_tlp.Aﾎﾟｰﾄ:
               basic.showNumber(Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100));
          break;
        case eureka_tlp.Bﾎﾟｰﾄ:
               basic.showNumber(Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100));
          break;
      }
    }
  
  
  
    //% color="#009A00"  weight=81 block="光ｾﾝｻ値 |%limit| より暗い |%tlp|" group="3_電気の利用ユニット"
    //% limit.min=0 limit.max=100
    export function decideLight(limit: number, tlp: eureka_tlp): boolean {
      switch (tlp) {
        case eureka_tlp.Aﾎﾟｰﾄ:
          if ((pins.analogReadPin(AnalogPin.P0) / 1023) * 100 < limit) {
            return true;
          } else {
            return false;
          }
          break;
        case eureka_tlp.Bﾎﾟｰﾄ:
          if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit) {
            return true;
          } else {
            return false;
          }
          break;
      }
    }
  
  
  
    //% color="#009A00"  weight=80 blockId=eureka_denkitemp block="光ｾﾝｻ値 |%pin|" group="3_電気の利用ユニット"
    export function eureka_denkitemp(pin: eureka_denki): number {
      switch (pin) {
        case eureka_denki.Aﾎﾟｰﾄ:
          return Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100);
        case eureka_denki.Bﾎﾟｰﾄ:
          return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
      }
    }
    //% color="#a0522d"  weight=77 blockId=eureka_denkihuman block="人感ｾﾝｻ値 |%pin|" group="3_電気の利用ユニット"
    export function eureka_denkihuman(pin: eureka_denki): number {
      switch (pin) {
        case eureka_denki.Aﾎﾟｰﾄ:
          pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
          return pins.digitalReadPin(DigitalPin.P14);
        case eureka_denki.Bﾎﾟｰﾄ:
          pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
          return pins.digitalReadPin(DigitalPin.P16);
      }
    }
  
  
    //% color="#a0522d"  weight=79 blockId=eureka_denkihumanLED block="人感ｾﾝｻの値を表示する" group="3_電気の利用ユニット"
    export function eureka_denkihumanLED(pin: eureka_p1416) {
      pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
      pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
      switch (pin) {
        case eureka_p1416.Aﾎﾟｰﾄ:
         basic.showNumber(pins.digitalReadPin(DigitalPin.P14));
          break;
        case eureka_p1416.Bﾎﾟｰﾄ:
         basic.showNumber(pins.digitalReadPin(DigitalPin.P16));
          break;
      }
    }
  
  
  
  
    //% color="#a0522d" weight=78 block="人が動いたら |%pin|" group="3_電気の利用ユニット"
    export function humanDetection(pin: eureka_p1416): boolean {
      pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
      pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
      switch (pin) {
        case eureka_p1416.Aﾎﾟｰﾄ:
          if (pins.digitalReadPin(DigitalPin.P14) == 1) {
            return true;
          } else {
            return false;
          }
          break;
        case eureka_p1416.Bﾎﾟｰﾄ:
          if (pins.digitalReadPin(DigitalPin.P16) == 1) {
            return true;
          } else {
            return false;
          }
          break;
      }
    }
  
  
  
    //% color="#a9a9a9"  weight=75 blockId=eureka_denkiwhite block="LED |%mode| |%pin|" group="3_電気の利用ユニット"
    export function eureka_denkiwhite(mode: onoff, port: eureka_denki) {
      switch (port) {
        case eureka_denki.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P13, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P13, 0);
          }
        case eureka_denki.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P15, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P15, 0);
          }
      }
    }
  }
  //% color="#0000ff" weight=98 block="たん体ﾕﾆｯﾄ" 
  
  namespace eureka_blocks_soro {
  
    //% color="#4169e1" weight=26 blockId=eureka_O2kousei block="酸素センサー校正 |%pin|" group="酸素センサー"
    export function eureka_O2kousei(pin: eureka_IO) {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          kousei_A=pins.analogReadPin(AnalogPin.P0);
          break; 
        case eureka_IO.Bﾎﾟｰﾄ:
          kousei_B=pins.analogReadPin(AnalogPin.P1);
          break;
       case eureka_IO.Cﾎﾟｰﾄ:
          kousei_C=pins.analogReadPin(AnalogPin.P2);
          break; 
          }
    }
    //% color="#4169e1" weight=26 blockId=eureka_O2LED block="酸素濃度をmicro:bitへ表示 |%pin|" group="酸素センサー"
    export function eureka_O2LED(pin: eureka_IO) {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          let O2_0=Math.round( pins.analogReadPin(AnalogPin.P0)/kousei_A*20.95* 10) / 10
          if (O2_0 >= 5 && O2_0 <= 25){
          basic.showString(convertToText("" + O2_0 + "% "));
          }
          else {
              basic.showString("ER")
          }
          break; 
        case eureka_IO.Bﾎﾟｰﾄ:
           let O2_1=Math.round( pins.analogReadPin(AnalogPin.P1)/kousei_B*20.95* 10) / 10
          if (O2_1 >= 5 && O2_1 <= 25){
          basic.showString(convertToText("" + O2_1 + "% "));
          }
          else {
              basic.showString("ER")
          }   
          break;
       case eureka_IO.Cﾎﾟｰﾄ:
           let O2_2=Math.round( pins.analogReadPin(AnalogPin.P2)/kousei_C*20.95* 10) / 10
          if (O2_2 >= 5 && O2_2 <= 25){
          basic.showString(convertToText("" + O2_2 + "% "));
          }
          else {
              basic.showString("ER")
          }   
          break; 
          }
    }
  
   //% color="#4169e1" weight=26 blockId=eureka_O2serial block="酸素濃度をシリアル出力 |%pin|" group="酸素センサー"
    export function eureka_O2serial(pin: eureka_IO) {
      basic.pause(100);
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          serial.writeLine(convertToText(Math.round( pins.analogReadPin(AnalogPin.P0)/kousei_A*20.95* 100) / 100));
          break; 
        case eureka_IO.Bﾎﾟｰﾄ:
          serial.writeLine(convertToText(Math.round( pins.analogReadPin(AnalogPin.P1)/kousei_B*20.95* 100) / 100));
          break;
       case eureka_IO.Cﾎﾟｰﾄ:
          serial.writeLine(convertToText(Math.round( pins.analogReadPin(AnalogPin.P2)/kousei_C*20.95* 100) / 100));
          break; 
          }
    }
  
    //% color="#4169e1"  weight=24 blockId=eureka_O2disp block="酸素濃度 |%pin|" group="酸素センサー"
    export function eureka_O2disp(pin: eureka_IO): number {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          return pins.analogReadPin(AnalogPin.P0)/kousei_A*20.95;
          break; 
        case eureka_IO.Bﾎﾟｰﾄ:
          return pins.analogReadPin(AnalogPin.P1)/kousei_B*20.95;
          break;
       case eureka_IO.Cﾎﾟｰﾄ:
          return pins.analogReadPin(AnalogPin.P2)/kousei_C*20.95;
          break; 
          }
    }
  
  
    namespace stem {
      /**
       * TFW-TP2の温度[℃]を返します。
       * @param format number format, eg: OutputNumberFormat.INTEGER
       */
      //% blockId = TP2_getTemperature
      //% block="Temperature[degC] (TP2) || %format"
      //% group="TP2"
      //% weight=100
      export function TP2_getTemperature(format: OutputNumberFormat = OutputNumberFormat.INTEGER): number {
          if (format === OutputNumberFormat.INTEGER) {
              return Math.round(DS18B20.Temperature()/100.0);
          }
          return DS18B20.Temperature()/100.0;
      }
  }
  
  
  
  
    //% color="#6041f1"  weight=60 blockId=eureka_L9110 block="ﾓｰﾀｰﾌｧﾝL |%mode| |%pin|" group="4_ユーレカ装置"
    //% advanced=true
    //% mode.min=-100 mode.max=100
    export function L9110driver(port: eureka_denki, mode: number) {
      switch (port) {
        case eureka_denki.Aﾎﾟｰﾄ:
          if (mode > 0) {
            pins.analogWritePin(AnalogPin.P0, Math.round(mode * 10.23));
            pins.digitalWritePin(DigitalPin.P13, 0);
          }
          if (mode < 0) {
            pins.digitalWritePin(DigitalPin.P0, 0);
            pins.analogWritePin(AnalogPin.P13, Math.round(-mode * 10.23));
          }
          if (mode == 0) {
            pins.digitalWritePin(DigitalPin.P0, 0);
            pins.digitalWritePin(DigitalPin.P13, 0);
          }
          break;
        case eureka_denki.Bﾎﾟｰﾄ:
          if (mode > 0) {
            pins.analogWritePin(AnalogPin.P1, Math.round(mode * 10.23));
            pins.digitalWritePin(DigitalPin.P15, 0);
          }
          if (mode < 0) {
            pins.digitalWritePin(DigitalPin.P1, 0);
            pins.analogWritePin(AnalogPin.P15, Math.round(-mode * 10.23));
          }
          if (mode == 0) {
            pins.digitalWritePin(DigitalPin.P1, 0);
            pins.digitalWritePin(DigitalPin.P15, 0);
          }
          break;
      }
    }
  
    //% color="#a9a9a9" weight=58 blockId=eureka_relay block="電磁・FETﾘﾚｰ(ﾃﾞｼﾞﾀﾙ出力) |%mode| |%pin|" group="単体のリレーユニット"
    export function eureka_relay(mode: onoff, pin: eureka_IO) {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P0, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P0, 0);
          }
        case eureka_IO.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P1, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P1, 0);
          }
        case eureka_IO.Cﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P2, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P2, 0);
          }
      }
    }
    //% color="#a9a9a9" weight=56 blockId=eureka_relay_2 block="FETﾘﾚｰ(ｱﾅﾛｸﾞ出力) |%limit| |%syuturyoku|" group="単体のリレーユニット"
    //% syuturyoku.min=0 syuturyoku.max=1023
    export function eureka_relay_2(syuturyoku: number, pin: eureka_IO) {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ: {
          return pins.analogWritePin(AnalogPin.P0, syuturyoku);
        }
        case eureka_IO.Bﾎﾟｰﾄ: {
          return pins.analogWritePin(AnalogPin.P1, syuturyoku);
        }
        case eureka_IO.Cﾎﾟｰﾄ: {
          return pins.analogWritePin(AnalogPin.P2, syuturyoku);
        }
      }
    }
  
  
    //% color="#20b2aa" weight=52 blockId=eureka_m_driver block="ﾓｰﾀｰﾄﾞﾗｲﾊﾞｰD 動き|%mode| |%pin|" group="モータードライバー"
    export function eureka_m_driver(mode: moter_d, pin: eureka_denki) {
      switch (pin) {
        case eureka_denki.Aﾎﾟｰﾄ:
          if (mode == moter_d.両方前) {
            pins.digitalWritePin(DigitalPin.P0, 1);
            pins.digitalWritePin(DigitalPin.P13, 0);
            pins.digitalWritePin(DigitalPin.P14, 1);
          }
          if (mode == moter_d.両方後) {
            pins.digitalWritePin(DigitalPin.P0, 0);
            pins.digitalWritePin(DigitalPin.P13, 1);
            pins.digitalWritePin(DigitalPin.P14, 0);
          }
          if (mode == moter_d.Ｌだけ前) {
            pins.digitalWritePin(DigitalPin.P0, 0);
            pins.digitalWritePin(DigitalPin.P13, 0);
            pins.digitalWritePin(DigitalPin.P14, 1);
          }
          if (mode == moter_d.Ｒだけ前) {
            pins.digitalWritePin(DigitalPin.P0, 1);
            pins.digitalWritePin(DigitalPin.P13, 0);
            pins.digitalWritePin(DigitalPin.P14, 0);
          }
          if (mode == moter_d.Ｌだけ後) {
            pins.digitalWritePin(DigitalPin.P0, 0);
            pins.digitalWritePin(DigitalPin.P13, 1);
            pins.digitalWritePin(DigitalPin.P14, 1);
          }
          if (mode == moter_d.Ｒだけ後) {
            pins.digitalWritePin(DigitalPin.P0, 1);
            pins.digitalWritePin(DigitalPin.P13, 1);
            pins.digitalWritePin(DigitalPin.P14, 0);
          }
          if (mode == moter_d.停止) {
            pins.digitalWritePin(DigitalPin.P0, 0);
            pins.digitalWritePin(DigitalPin.P13, 0);
            pins.digitalWritePin(DigitalPin.P14, 0);
          }
        case eureka_denki.Bﾎﾟｰﾄ:
          if (mode == moter_d.両方前) {
            pins.digitalWritePin(DigitalPin.P1, 1);
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.digitalWritePin(DigitalPin.P16, 1);
          }
          if (mode == moter_d.両方後) {
            pins.digitalWritePin(DigitalPin.P1, 0);
            pins.digitalWritePin(DigitalPin.P15, 1);
            pins.digitalWritePin(DigitalPin.P16, 0);
          }
          if (mode == moter_d.Ｌだけ前) {
            pins.digitalWritePin(DigitalPin.P1, 0);
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.digitalWritePin(DigitalPin.P16, 1);
          }
          if (mode == moter_d.Ｒだけ前) {
            pins.digitalWritePin(DigitalPin.P1, 1);
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.digitalWritePin(DigitalPin.P16, 0);
          }
          if (mode == moter_d.Ｌだけ後) {
            pins.digitalWritePin(DigitalPin.P1, 0);
            pins.digitalWritePin(DigitalPin.P15, 1);
            pins.digitalWritePin(DigitalPin.P16, 1);
          }
          if (mode == moter_d.Ｒだけ後) {
            pins.digitalWritePin(DigitalPin.P1, 1);
            pins.digitalWritePin(DigitalPin.P15, 1);
            pins.digitalWritePin(DigitalPin.P16, 0);
          }
          if (mode == moter_d.停止) {
            pins.digitalWritePin(DigitalPin.P1, 0);
            pins.digitalWritePin(DigitalPin.P15, 0);
            pins.digitalWritePin(DigitalPin.P16, 0);
          }
      }
    }
  
    //% color="#ffd700"  weight=40 blockId=eureka_light block="単体_光ｾﾝｻ値 |%pin|" group="5_単体ユニットセンサー"
    //% advanced=true
    export function tantai_light(pin: eureka_IO): number {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          return Math.round((pins.analogReadPin(AnalogPin.P0) / 1023) * 100);
        case eureka_IO.Bﾎﾟｰﾄ:
          return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
        case eureka_IO.Cﾎﾟｰﾄ:
          return Math.round((pins.analogReadPin(AnalogPin.P2) / 1023) * 100);
      }
    }
  
    //% color="#ffd700"  blockID=tantai_Light weight=38 block="単体_光ｾﾝｻ |%limit| より暗い |%pin|" group="5_単体ユニットセンサー"
    //% advanced=true
    //% limit.min=0 limit.max=100
    export function tantai_Light(limit: number, pin: eureka_IO): boolean {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          if ((pins.analogReadPin(AnalogPin.P0) / 1023) * 100 < limit) {
            return true;
          } else {
            return false;
          }
          break;
        case eureka_IO.Bﾎﾟｰﾄ:
          if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit) {
            return true;
          } else {
            return false;
          }
          break;
        case eureka_IO.Cﾎﾟｰﾄ:
          if ((pins.analogReadPin(AnalogPin.P2) / 1023) * 100 < limit) {
            return true;
          } else {
            return false;
          }
          break;
      }
    }
  
    //% color="#858585" weight=36 block="単体_人が動いたら |%pin|" group="5_単体ユニットセンサー"
    //% advanced=true
    export function tantai_humanDetection(pin: eureka_IO): boolean {
      pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
      pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
          if (pins.digitalReadPin(DigitalPin.P0) == 1) {
            return true;
          } else {
            return false;
          }
          break;
        case eureka_IO.Bﾎﾟｰﾄ:
          pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
          if (pins.digitalReadPin(DigitalPin.P1) == 1) {
            return true;
          } else {
            return false;
          }
          break;
        case eureka_IO.Cﾎﾟｰﾄ:
          pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
          if (pins.digitalReadPin(DigitalPin.P2) == 1) {
            return true;
          } else {
            return false;
          }
          break;
      }
    }
    //% color="#858585" weight=34 blockId=eureka_human block="単体_人感ｾﾝｻ値 |%pin|" group="5_単体ユニットセンサー"
    //% advanced=true
      export function eureka_human(pin: eureka_IO): number {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          pins.setPull(DigitalPin.P0, PinPullMode.PullNone);
          return pins.digitalReadPin(DigitalPin.P0);
        case eureka_IO.Bﾎﾟｰﾄ:
          pins.setPull(DigitalPin.P1, PinPullMode.PullNone);
          return pins.digitalReadPin(DigitalPin.P1);
        case eureka_IO.Cﾎﾟｰﾄ:
          pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
          return pins.digitalReadPin(DigitalPin.P2);
      }
    }
    //% color="#ff7b00" weight=32 blockId=eureka_temp block="温度ｾﾝｻMCP |%pin|" group="5_単体ユニットセンサー"
    //% advanced=true
    export function eureka_temp(pin: eureka_IO): number {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          return Math.round(
            ((pins.analogReadPin(AnalogPin.P0) * 3250) / 1024 - 500) / 10
          );
        case eureka_IO.Bﾎﾟｰﾄ:
          return Math.round(
            ((pins.analogReadPin(AnalogPin.P1) * 3250) / 1024 - 500) / 10
          );
        case eureka_IO.Cﾎﾟｰﾄ:
          return Math.round(
            ((pins.analogReadPin(AnalogPin.P2) * 3250) / 1024 - 500) / 10
          );
      }
    }
  
    //% color="#2a2aba" weight=30 blockId=sonar_ping block="超音波きょりｾﾝｻ　|%pin| |%sonar_quality|" group="超音波距離センサー"
    export function ping(pin: eureka_tlp,sonar_quality:sonar_avg): number {
          if (sonar_quality　==sonar_avg.平均20回){
              sonar_quality=20
          }
          if (sonar_quality==sonar_avg.平均5回){
              sonar_quality=5
          }
          if (sonar_quality==sonar_avg.生データ){
              sonar_quality=1
          }
      let  d1=0;
      let  d2=0;
  
      switch (pin) {
  
  
      case eureka_tlp.Aﾎﾟｰﾄ:
          for ( let i=0 ; i<sonar_quality ; i++ ){
              basic.pause(5);
              pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
              pins.digitalWritePin(DigitalPin.P13, 0);
              control.waitMicros(2);
              pins.digitalWritePin(DigitalPin.P13, 1);
              control.waitMicros(10);
              pins.digitalWritePin(DigitalPin.P13, 0);
              // read
              d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
              d2=d2+d1;
              }
              return Math.round(Math.idiv(d2/sonar_quality, 58)*1.5);
          break;
  
      case eureka_tlp.Bﾎﾟｰﾄ:
          for  ( let i=0 ; i<sonar_quality; i++){
          basic.pause(20);
          pins.setPull(DigitalPin.P15, PinPullMode.PullNone);
          pins.digitalWritePin(DigitalPin.P15, 0);
          control.waitMicros(2);
          pins.digitalWritePin(DigitalPin.P15, 1);
          control.waitMicros(10);
          pins.digitalWritePin(DigitalPin.P15, 0);
          // read
          d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
          d2=d2+d1;
          }
          return Math.round(Math.idiv(d2/sonar_quality, 58)*1.5);
      }
    }
  
  /*
    //% color="#2a2aba" weight=28 blockId=sonar_ping_3 block="きょりが |%limit| cmより |%nagasa| |%pin|" group="超音波距離センサー"
    //% limit.min=0 limit.max=50
    export function sonar_ping_3(limit: number ,nagasa:kyori,pin: eureka_tlp) {
      let  d1=0;
      let  d2=0;
      if  (pin=="Aﾎﾟｰﾄ") {
  
  
  
          for ( let i=0 ; i<20 ; i++ ){
          // send
          basic.pause(5);
          pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
          pins.digitalWritePin(DigitalPin.P13, 0);
          control.waitMicros(2);
          pins.digitalWritePin(DigitalPin.P13, 1);
          control.waitMicros(10);
          pins.digitalWritePin(DigitalPin.P13, 0);
          // read
          d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
          d2= d1+d2;
          }
          switch(nagasa){
              case kyori.短い:
                  if (Math.idiv(d2/20, 58) * 1.5 < limit) {
                  return true;
                  } else {
                  return false;
                  }
              case kyori.長い:
                  if (Math.idiv(d2/20, 58) * 1.5 < limit) {
                  return false;
                  } else {
                  return true;
              }
          }
      }
      }
  */  
  
  
  
   //% color="#2a2aba" weight=27 blockId=sonar_ping_3 block="きょりが |%limit| cmより長い |%pin|" group="超音波距離センサー"
    //% limit.min=0 limit.max=50
    export function sonar_ping_3(limit: number ,pin:eureka_tlp) :boolean{
      let  d1=0;
      let  d2=0;
  
      switch(pin){
          case eureka_tlp.Aﾎﾟｰﾄ:
          for ( let i=0 ; i<20 ; i++ ){
          // send
          basic.pause(5);
          pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
          pins.digitalWritePin(DigitalPin.P13, 0);
          control.waitMicros(2);
          pins.digitalWritePin(DigitalPin.P13, 1);
          control.waitMicros(10);
          pins.digitalWritePin(DigitalPin.P13, 0);
          // read
          d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
          d2= d1+d2;
          }
                  if (Math.idiv(d2/20, 58) * 1.5 < limit) {
                  return false;
                  } else {
                  return true;
                  }
   
          case eureka_tlp.Bﾎﾟｰﾄ:
          for ( let i=0 ; i<20 ; i++ ){
          // send
          basic.pause(5);
          pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
          pins.digitalWritePin(DigitalPin.P15, 0);
          control.waitMicros(2);
          pins.digitalWritePin(DigitalPin.P15, 1);
          control.waitMicros(10);
          pins.digitalWritePin(DigitalPin.P15, 0);
          // read
          d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
          d2= d1+d2;
          }
  
              if (Math.idiv(d2/20, 58) * 1.5 < limit) {
              return false;
              } else {
              return true;
              }
  
              }
          }
  
  
  
    //% color="#2a2aba" weight=28 blockId=sonar_ping_4 block="きょりが |%limit| cmより短い |%pin|" group="超音波距離センサー"
    //% limit.min=0 limit.max=50
    export function sonar_ping_4(limit: number ,pin:eureka_tlp) :boolean{
      let  d1=0;
      let  d2=0;
  
      switch(pin){
          case eureka_tlp.Aﾎﾟｰﾄ:
          for ( let i=0 ; i<20 ; i++ ){
          // send
          basic.pause(5);
          pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
          pins.digitalWritePin(DigitalPin.P13, 0);
          control.waitMicros(2);
          pins.digitalWritePin(DigitalPin.P13, 1);
          control.waitMicros(10);
          pins.digitalWritePin(DigitalPin.P13, 0);
          // read
          d1 = pins.pulseIn(DigitalPin.P14, PulseValue.High, 500 * 58);
          d2= d1+d2;
          }
                  if (Math.idiv(d2/20, 58) * 1.5 < limit) {
                  return true;
                  } else {
                  return false;
                  }
   
          case eureka_tlp.Bﾎﾟｰﾄ:
          for ( let i=0 ; i<20 ; i++ ){
          // send
          basic.pause(5);
          pins.setPull(DigitalPin.P16, PinPullMode.PullNone);
          pins.digitalWritePin(DigitalPin.P15, 0);
          control.waitMicros(2);
          pins.digitalWritePin(DigitalPin.P15, 1);
          control.waitMicros(10);
          pins.digitalWritePin(DigitalPin.P15, 0);
          // read
          d1 = pins.pulseIn(DigitalPin.P16, PulseValue.High, 500 * 58);
          d2= d1+d2;
          }
  
              if (Math.idiv(d2/20, 58) * 1.5 < limit) {
              return true;
              } else {
              return false;
              }
  
              }
          }
  
  
  
    //% color="#f071bd" weight=26 blockId=eureka_CdS block="単体_ﾌｫﾄﾘﾌﾚｸﾀｰ |%pin|" group="5_単体ユニットセンサー"
    //% advanced=true
    export function eureka_CdS(pin: eureka_IO): number {
      switch (pin) {
        case eureka_IO.Aﾎﾟｰﾄ:
          return (pins.analogReadPin(AnalogPin.P0) / 1023) * 100;
        case eureka_IO.Bﾎﾟｰﾄ:
          return (pins.analogReadPin(AnalogPin.P1) / 1023) * 100;
        case eureka_IO.Cﾎﾟｰﾄ:
          return (pins.analogReadPin(AnalogPin.P2) / 1023) * 100;
      }
    }
  
    //% color="#ff7b00" weight=54 blockId=eureka_white block="単体LED |%mode| |%pin|" group="たん体ＬＥＤ"
  
    export function eureka_white(port: eureka_IO, mode: onoff) {
      switch (port) {
        case eureka_IO.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P0, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P0, 0);
          }
        case eureka_IO.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P1, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P1, 0);
          }
        case eureka_IO.Cﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P2, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P2, 0);
          }
      }
    }
  
  
  
  
    //% color="#ff7b00" weight=17 blockId=eureka_whiteselect block="単体LED |%mode| 時間|%LED_time|秒 ポート|%pin|" group="たん体ＬＥＤ"
    export function eureka_whiteselect ( mode: onoff , LED_time:LED_wait , port:eureka_IO) {
      switch (port) {
        case eureka_IO.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
              pins.digitalWritePin(DigitalPin.P0, 1);
              basic.pause(LED_time*200);
          return
          } else {
              pins.digitalWritePin(DigitalPin.P0, 0);
              basic.pause(LED_time*200);
          return
          }
        case eureka_IO.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
              pins.digitalWritePin(DigitalPin.P1, 1);
              basic.pause(LED_time*200);
          return
          } else {
              pins.digitalWritePin(DigitalPin.P1, 0);
              basic.pause(LED_time*200);
          return
          }
        case eureka_IO.Cﾎﾟｰﾄ:
          if (mode == onoff.ON) {
              pins.digitalWritePin(DigitalPin.P2, 1);
              basic.pause(LED_time*200);
          return
          } else {
              pins.digitalWritePin(DigitalPin.P2, 0);
              basic.pause(LED_time*200);
          return
          }
      }
    }
  
  
  
    //% color="#ff7b00" weight=17 blockId=eureka_white2 block="単体LED　点めつは|%mode|　ﾎﾟｰﾄ|%pin|" group="たん体ＬＥＤ"
    export function eureka_white2(mode: LED_onoff ,port: eureka_IO ) {
      switch (port) {
        case eureka_IO.Aﾎﾟｰﾄ:
          pins.digitalWritePin(DigitalPin.P0, 1);
          basic.pause(mode);
          if (mode == 0){
              return
          } else {
          pins.digitalWritePin(DigitalPin.P0, 0);
          basic.pause(mode);
          return
          }
  
        case eureka_IO.Bﾎﾟｰﾄ:
          pins.digitalWritePin(DigitalPin.P1, 1);
          basic.pause(mode);
          if (mode == 0){
              return
          } else {
          pins.digitalWritePin(DigitalPin.P1, 0);
          basic.pause(mode);
          return
          }
        case eureka_IO.Cﾎﾟｰﾄ:
          pins.digitalWritePin(DigitalPin.P2, 1);
          basic.pause(mode);
          if (mode == 0){
              return
          } else {
          pins.digitalWritePin(DigitalPin.P2, 0);
          basic.pause(mode);
          return
       }
  
      }
    }
  
  
  
      //% color="#858585" weight=54 blockId=eureka_fullcolor block="ＬＥＤ |%color|色で点めつは|%mode| ﾎﾟｰﾄ|%pin|" group="フルカラーＬＥＤ"
      export function eureka_fullcolor(color:LED_color, mode:LED_onoff, pin: eureka_tlp) {
      switch (color) {
          case LED_color.赤:
          pins.digitalWritePin(DigitalPin.P0, 1);
          basic.pause(mode);
          if (mode ==0) {
              return
          } else {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
          basic.pause(mode);
          return
          }
          case LED_color.オレンジ:
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.analogWritePin(AnalogPin.P13, 240)
          basic.pause(mode);
          if (mode ==0) {
              return
          } else {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
          basic.pause(mode);
           return
          }
          case LED_color.き:
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 1);
          basic.pause(mode);
          if (mode ==0) {
              return
          } else {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
          basic.pause(mode);
          return
          }
              case LED_color.みどり:
          pins.digitalWritePin(DigitalPin.P13, 1);
          basic.pause(mode);
          if (mode ==0) {
              return
          } else {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
          basic.pause(mode);
          return
          }
              case LED_color.水:
          pins.analogWritePin(AnalogPin.P0, 388)
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.analogWritePin(AnalogPin.P14, 767)
          basic.pause(mode);
          if (mode ==0) {
              return
          } else {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
           basic.pause(mode);
          return
          }
              case LED_color.青:
          pins.digitalWritePin(DigitalPin.P14, 1);
          basic.pause(mode);
          if (mode ==0) {
              return
          } else {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
          basic.pause(mode);
          return
          }
              case LED_color.むらさき:
          pins.analogWritePin(AnalogPin.P0, 338)
          pins.digitalWritePin(DigitalPin.P14, 1);
          basic.pause(mode);
          if (mode ==0) {
              return
          } else {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
          basic.pause(mode);
          return
          }
              case LED_color.白:
          pins.digitalWritePin(DigitalPin.P0, 1);
          pins.digitalWritePin(DigitalPin.P13, 1);
          pins.digitalWritePin(DigitalPin.P14, 1);
          basic.pause(mode);
          if (mode ==0) {
              return
          } else {
          pins.digitalWritePin(DigitalPin.P0, 0);
          pins.digitalWritePin(DigitalPin.P13, 0);
          pins.digitalWritePin(DigitalPin.P14, 0);
          basic.pause(mode);
          return
          }
        }
      }
  
      //% color="#4741f1" weight=53 blockId=eureka_tl_blue block="青 点とう|%mode| |%pin|" group="フルカラーＬＥＤ"
      export function eureka_tl_blue(mode: onoff, pin: eureka_tlp) {
      switch (pin) {
        case eureka_tlp.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P14, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P14, 0);
          }
        case eureka_tlp.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P16, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P16, 0);
          }
      }
    }
    //% color="#32cd32" weight=52 blockId=eureka_tl_green block="みどり 点とう|%mode| |%pin|" group="フルカラーＬＥＤ"
    export function eureka_tl_green(mode: onoff, pin: eureka_tlp) {
      switch (pin) {
        case eureka_tlp.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P13, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P13, 0);
          }
        case eureka_tlp.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P15, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P15, 0);
          }
      }
    }
    //% color="#ff4940" weight=51 blockId=eureka_tl_red block="赤 点とう|%mode| |%pin|" group="フルカラーＬＥＤ"
    export function eureka_tl_red(mode: onoff, pin: eureka_tlp) {
      switch (pin) {
        case eureka_tlp.Aﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P0, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P0, 0);
          }
        case eureka_tlp.Bﾎﾟｰﾄ:
          if (mode == onoff.ON) {
            return pins.digitalWritePin(DigitalPin.P1, 1);
          } else {
            return pins.digitalWritePin(DigitalPin.P1, 0);
          }
      }
    }
  
  }
  
  
  