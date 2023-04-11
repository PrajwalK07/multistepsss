import { LightningElement ,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

	
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

//
export default class MultiStepForm extends NavigationMixin(LightningElement) {
    //page1 = [,,,,]
    //page2 = [,,,,,]
   // page3 = [,,,,,]

    @track recData = {
        "First_Name__c":"",
        "Middle_Name__c":"",
        "Last_Name__c":"",
        "Date_of_Birth__c":"",
        "Phone__c":"",
        "Email__c":"",
        "Street_address__c":"",
        "Country__c":"",
        "State__c":"",
        "ZIP_or_postal_code__c":"",
        "District__c":"",
        "City__c":"",
        "Graduation_Passing_Year__c":"",
        "Graduation_Percentage__c":"",
        "HSC_12th_Passing_Year__c":"",
        "HSC_12th_Percentage__c":"",
        "SSC_10th_Passing_year__c":"",
        "SSC_10th_Percentage__c":"",
    }
    step = 1;
    currentStep = "1";
    showSpinner=true;
    showFirstPage = true;
    showSecondPage = false;
    showThirdPage = false;
    connectedCallback(){
        console.log('Inside connected callback')
        //this.showSpinner=false;
    }
    renderedCallback(){
        console.log('Inside rendered callback')
        this.showSpinner=false;
    }

    pathclick(event){
        /*console.group('step cl '+event.target.value)
        if(event.target.value == 1){
            this.currentStep = "" + event.target.value;
            showFirstPage = true;
            showSecondPage = false;
            showThirdPage = false;
        }else if(event.target.value == 2){
            this.currentStep = "" + event.target.value;
            showFirstPage = false;
            showSecondPage = true;
            showThirdPage = false;
        }else if(event.target.value = 3){
            this.currentStep = "" + event.target.value;
            showFirstPage = false;
            showSecondPage = false;
            showThirdPage = true;
        }*/
    }


    nextPage(event) {
        if (this.step != 3) {
            this.step++;
        }
        this.showSpinner=true;
        this.handleSetUpSteps();
        this.showSpinner=false;
    }

    previousPage(event) {
        if (this.step != 1) {
            this.step--;
        }
        this.showSpinner=true;
        this.handleSetUpSteps();
        this.showSpinner=false;
    }

    handleSetUpSteps() {
        this.showFirstPage = this.step == 1;
        this.showSecondPage = this.step == 2;
        this.showThirdPage = this.step == 3;
        this.currentStep = "" + this.step;
        console.log('this current on click'+this.currentStep)

    }

    handleSubmit(event) {
        console.log('inside on submit')
        event.preventDefault(); 

        //console.log('inside handle submit')
        console.log('onsubmit event recordEditForm'+ this.recData);
        const fields = event.detail.fields;

        let fieldApiList = Object.keys(this.recData)
        fieldApiList.forEach((f) => {
            console.log('key'+f);
           console.log('value'+this.recData[f]);
           fields[f] = this.recData[f];
        });


        //fields[f] = 
        this.template.querySelector('lightning-record-edit-form').submit(fields);

    }
    handleSuccess(event) {
        this.showSpinner=true;
        console.log('onsuccess event recordEditForm', event.detail.id);
        this.showToast(event.detail.id);
        
        this.navigateToRecordPageView(event.detail.id)
        this.showSpinner=false;

    }

    showToast(recId) {
        console.log('show toast'+recId)
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Record created Message'+recId,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }


    handleFieldChange(event){
        console.log('field name'+ event.currentTarget.dataset.name)
        console.log('field value'+ event.target.value)
        this.recData[event.currentTarget.dataset.name] = event.target.value
        
    }

    navigateToRecordPageView(recId){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
               attributes :{
                recordId :recId,
                objectApiName : 'Person__c',
                actionName : 'view'
            }
        })
    }


}