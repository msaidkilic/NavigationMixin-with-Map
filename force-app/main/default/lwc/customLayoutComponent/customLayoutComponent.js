import { LightningElement, api, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import CONTACT_FIELD from "@salesforce/schema/customObject__c.Contact__c";

export default class customLayoutComponent extends LightningElement {
  @api recordId;

  @wire(getRecord, { recordId: "$recordId", fields: [CONTACT_FIELD] })
  customObject;

  get ContactId() {
    return getFieldValue(this.customObject.data, CONTACT_FIELD);
  }
}