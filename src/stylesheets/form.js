var t = require('tcomb-form-native');
var _ = require('lodash');
import {
 moderateScale, verticalScale,
} from 'react-native-size-matters';

const multiLine = _.cloneDeep(t.form.Form.stylesheet);
multiLine.textbox.normal.borderWidth = 0;
multiLine.textbox.error.borderWidth = 0;
multiLine.textbox.normal.marginBottom = 0;
multiLine.textbox.error.marginBottom = 0;

multiLine.textbox.normal.fontSize = moderateScale(20);
multiLine.textbox.error.fontSize = moderateScale(20);
multiLine.textbox.normal.height = moderateScale(60);
multiLine.textbox.error.height = moderateScale(60);
multiLine.textbox.normal.fontFamily = 'Roboto-Regular';
multiLine.textbox.error.fontFamily = 'Roboto-Regular';

multiLine.textboxView.normal.borderWidth = 0;
multiLine.textboxView.error.borderWidth = 0;
multiLine.textboxView.normal.borderRadius = 0;
multiLine.textboxView.error.borderRadius = 0;
multiLine.textboxView.normal.borderBottomWidth = verticalScale(3);
multiLine.textboxView.error.borderBottomWidth = verticalScale(3);
multiLine.textboxView.normal.borderColor = 'dimgrey';
multiLine.textboxView.error.borderColor = '#ed4438';
multiLine.textbox.normal.marginBottom = verticalScale(5);
multiLine.textbox.error.marginBottom = verticalScale(5);

multiLine.dateValue.normal.fontSize = moderateScale(20)
multiLine.dateValue.error.fontSize = moderateScale(20)

multiLine.controlLabel.normal.color = 'dimgrey';
multiLine.controlLabel.error.color = '#ed4438';
multiLine.controlLabel.normal.fontFamily = 'Raleway-SemiBold';
multiLine.controlLabel.error.fontFamily = 'Raleway-SemiBold';
multiLine.controlLabel.normal.fontSize = moderateScale(16);
multiLine.controlLabel.error.fontSize = moderateScale(16);

const splitForm = _.cloneDeep(t.form.Form.stylesheet);
splitForm.fieldset = {
  flexDirection: 'row',
}

splitForm.formGroup.normal.flex = 1;
splitForm.formGroup.error.flex = 1;

splitForm.textbox.normal.borderWidth = 0;
splitForm.textbox.error.borderWidth = 0;
splitForm.textbox.normal.marginBottom = 0;
splitForm.textbox.error.marginBottom = 0;

splitForm.textbox.normal.fontSize = moderateScale(20);
splitForm.textbox.error.fontSize = moderateScale(20);

splitForm.textbox.normal.fontFamily = 'Roboto-Regular';
splitForm.textbox.error.fontFamily = 'Roboto-Regular';

splitForm.textboxView.normal.borderWidth = 0;
splitForm.textboxView.error.borderWidth = 0;
splitForm.textboxView.normal.borderRadius = 0;
splitForm.textboxView.error.borderRadius = 0;
splitForm.textboxView.normal.borderBottomWidth = verticalScale(2);
splitForm.textboxView.error.borderBottomWidth = verticalScale(2);
splitForm.textboxView.normal.borderColor = 'dimgrey';
splitForm.textboxView.error.borderColor = '#ef5a30';
splitForm.textbox.normal.marginBottom = verticalScale(5);
splitForm.textbox.error.marginBottom = verticalScale(5);

splitForm.controlLabel.normal.fontFamily = 'Raleway-SemiBold';
splitForm.controlLabel.error.fontFamily = 'Raleway-SemiBold';
splitForm.controlLabel.normal.fontSize = moderateScale(16);
splitForm.controlLabel.error.fontSize = moderateScale(16);
splitForm.controlLabel.normal.fontWeight = '500';
splitForm.controlLabel.error.fontWeight = '500';
splitForm.controlLabel.normal.color = 'dimgrey';
splitForm.controlLabel.error.color = 'dimgrey';

const formStyle = _.cloneDeep(t.form.Form.stylesheet);
formStyle.textbox.normal.borderWidth = 0;
formStyle.textbox.error.borderWidth = 0;
// formStyle.textbox.normal.marginBottom = moderateScale(13);
// formStyle.textbox.error.marginBottom = moderateScale(13);

formStyle.textbox.normal.fontSize = moderateScale(20);
formStyle.textbox.normal.height = moderateScale(35);
formStyle.textbox.error.fontSize = moderateScale(20);
formStyle.textbox.error.height = moderateScale(35);
formStyle.textbox.normal.fontFamily = 'Roboto-Regular';
formStyle.textbox.error.fontFamily = 'Roboto-Regular';
formStyle.textbox.error.marginBottom = moderateScale(0);
formStyle.textbox.error.marginBottom = moderateScale(0);

formStyle.textboxView.normal.borderWidth = 0;
formStyle.textboxView.error.borderWidth = 0;
formStyle.textboxView.normal.borderRadius = 0;
formStyle.textboxView.error.borderRadius = 0;
formStyle.textboxView.normal.borderBottomWidth = verticalScale(3);
formStyle.textboxView.error.borderBottomWidth = verticalScale(3);
formStyle.textboxView.normal.borderColor = 'dimgrey';
formStyle.textboxView.error.borderColor = '#ed4438';
// formStyle.textbox.normal.height = verticalScale(5);
// formStyle.textbox.error.height = verticalScale(5);
formStyle.textboxView.normal.marginTop = moderateScale(-5);
formStyle.textboxView.error.marginTop = moderateScale(-5);
formStyle.textboxView.normal.marginBottom = moderateScale(0);
formStyle.textboxView.error.marginBottom = verticalScale(0);

formStyle.dateValue.normal.fontSize = moderateScale(20)
formStyle.dateValue.error.fontSize = moderateScale(20)

formStyle.controlLabel.normal.color = 'dimgrey';
formStyle.controlLabel.error.color = '#ed4438';
formStyle.controlLabel.normal.fontFamily = 'Raleway-SemiBold';
formStyle.controlLabel.error.fontFamily = 'Raleway-SemiBold';
formStyle.controlLabel.normal.fontSize = moderateScale(16);
formStyle.controlLabel.error.fontSize = moderateScale(16);
formStyle.controlLabel.normal.marginTop = moderateScale(10);
formStyle.controlLabel.error.marginTop = moderateScale(10);

formStyle.button.borderRadius = moderateScale(4)
formStyle.button.backgroundColor = '#314855'
formStyle.button.borderColor = '#FFFBEF'
formStyle.button.borderWidth = moderateScale(2)
formStyle.button.marginBottom = moderateScale(0)
formStyle.button.marginTop = moderateScale(40)

formStyle.buttonText.fontFamily = 'Roboto-Medium'
// formStyle.buttonText.fontFamily = 'Roboto-Regular'

formStyle.formGroup.marginBottom = moderateScale(10)

export { formStyle, splitForm, multiLine };