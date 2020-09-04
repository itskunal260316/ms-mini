import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from, concat } from 'rxjs';
import { faClock, faPercent, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  faClock = faClock;
  faPercent = faPercent;
  faDollarSign = faDollarSign;
  public interestCalculated = false;
  public monthly_payment: number;
  public total_payment: number;
  public total_interest: number;



  loanDetails = this.fb.group({

    amountPri: ['', Validators.required],
    roi: ['', Validators.required],
    tenure: ['', Validators.required]

  });



  calcLoanDetails() {
    console.log(this.loanDetails);
    const amount = parseInt(this.loanDetails.value.amountPri);
    const rate = (this.loanDetails.value.roi) / 100;
    const tenure = (this.loanDetails.value.tenure);
    console.log("Amount : " + amount + " Rate : " + rate + " Tenure In months : " + tenure);
    this.total_interest = amount * rate * tenure;
    this.total_payment = amount + this.total_interest;
    this.monthly_payment = this.total_payment / (tenure * 12);
    this.interestCalculated = true;
  }


  calcDone() {

    this.loanDetails.setValue({

      amountPri: ['', Validators.required],
      roi: ['', Validators.required],
      tenure: ['', Validators.required]

    });

    this.interestCalculated = false;
  }


}
