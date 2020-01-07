import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FilebladeSelectFileDialogComponent} from '../../dialog/fileblade-select-file-dialog/fileblade-select-file-dialog.component';
import {MatDialog} from '@angular/material';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilebladeInputComponent),
  multi: true
};
@Component({
  selector: 'lib-fileblade-input',
  templateUrl: './fileblade-input.component.html',
  styleUrls: ['./fileblade-input.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class FilebladeInputComponent implements ControlValueAccessor {

  constructor(private dialog: MatDialog) { }

  // The internal data model
  innerValue: any = '';

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


  openFilebladeSelectionDialog(): void {
    this.dialog.open(FilebladeSelectFileDialogComponent, {
      width: '750px',
      height: '650px'
    }).afterClosed().subscribe((downloadUrl: string) => {
      if (downloadUrl != null) {
        this.value = downloadUrl;
      }
    });
  }

}
