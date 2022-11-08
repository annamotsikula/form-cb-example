import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'pwd-strength',
  templateUrl: './pwd-strength.component.html',
  styleUrls: ['./pwd-strength.component.scss']
})
export class PwdStrengthComponent implements OnChanges {
  @Input() passwordToVerify!: string;
  @Output() pwdStrongEnough = new EventEmitter<boolean>();
  barLevel: [string, string, string, string] = ['', '', '', '']
  private colors = ['red', 'orangered', 'orange', '#29c946'];
  msg: string = '';
  alertText: string = ''

  checkStrength(pwd: string) {
    let force = 0;
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const numbers = /[0-9]+/.test(pwd);
    const lowerCase = /[a-z]+/.test(pwd);
    const upperCase = /[A-Z]+/.test(pwd);
    const symbols = regex.test(pwd);
    const usedAllTypes = [numbers, symbols, lowerCase, upperCase];
    let passedMatches = 0;
    for (const flag of usedAllTypes) {
      passedMatches += flag === true ? 1 : 0;
    }
    force += 2 * pwd.length + (pwd.length >= 10 ? 1 : 0);
    force += passedMatches * 10;

    force = pwd.length <= 8 ? Math.min(force, 10) : force;

    // Poor variants
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;
    force = passedMatches === 4 ? Math.min(force, 40) : force;
    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToVerify'].currentValue;
    this.setBarColors(4, '#DDD');
    if (password) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c.idx, c.col);
      const pwdStrength = this.checkStrength(password);
      pwdStrength === 40
        ? this.pwdStrongEnough.emit(true)
        : this.pwdStrongEnough.emit(false);
      switch (c.idx) {
        case 1:
          this.msg = 'Poor';
          this.alertText = 'Can you try a bit advanced?'
          break;
        case 2:
          this.msg = 'Not Good';
          this.alertText = 'Hmm, you try hard'

          break;
        case 3:
          this.msg = 'Average';
          this.alertText = 'Almost finished. Keep going!'
          break;
        case 4:
          this.msg = 'Strong Password';
          this.alertText = 'Great! this will do. Just don\'t forget him'
          break;
        }
      } else {
        this.alertText = ''
        this.msg = '';
      }
  }
  private setBarColors(count: number, col: any) {
    for (let n = 0; n < count; n++) {
      this.barLevel[n] = col
    }
  }
  private getColor(s: number): {idx: number, col: string} {
    let idx = 0;
    if (s <= 10) {
      idx = 0;
    } else if (s <= 20) {
      idx = 1;
    } else if (s <= 30) {
      idx = 2;
    } else if (s <= 40) {
      idx = 3;
    } else {
      idx = 4;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx],
    };
  }

}
